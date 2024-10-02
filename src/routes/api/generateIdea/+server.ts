import openai from '$lib/openai';
import { json } from '@sveltejs/kit';
import { Ratelimit } from '@upstash/ratelimit';
import { createClient, kv } from '@vercel/kv';
import { KV_REST_API_URL, KV_REST_API_TOKEN } from '$env/static/private';

const kvClient = createClient({
	url: KV_REST_API_URL,
	token: KV_REST_API_TOKEN
});

const rateLimit = new Ratelimit({
	redis: kvClient,
	limiter: Ratelimit.slidingWindow(20, '1 s')
});

export async function GET(event) {
	// get the ip address
	const ip = event.getClientAddress();
	console.log('IP: ', ip);
	const { success, remaining } = await rateLimit.limit(ip);

	if (!success) {
		return json({ error: 'Too many requests' }, { status: 429 });
	}

	try {
		const completion = await openai.chat.completions.create({
			messages: [
				{
					role: 'user',
					content:
						'Create an easy difficulty idea based around: web app, utility. Answer in 50 words'
				}
			],
			model: 'ft:gpt-4o-mini-2024-07-18:personal::AASc4brM',
			temperature: 1.2,
			top_p: 0.9,
			frequency_penalty: 0.5,
			presence_penalty: 0.5
		});

		return json({ idea: completion.choices[0].message.content, remaining });
	} catch (error) {
		console.log('Error generating idea: ', error);
		return json({ error: 'Failed to generate idea' }, { status: 500 });
	}
}
