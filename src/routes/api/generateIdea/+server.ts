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
	limiter: Ratelimit.slidingWindow(10, '1 d')
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
					content: 'Generate a unique and creative programming idea in up to 50 words'
				}
			],
			model: 'gpt-4o-mini',
			temperature: 1.75
		});

		return json({ idea: completion.choices[0].message.content, remaining });
	} catch (error) {
		console.log('Error generating idea: ', error);
		return json({ error: 'Failed to generate idea' }, { status: 500 });
	}
}
