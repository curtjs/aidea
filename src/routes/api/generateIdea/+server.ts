import openai from '$lib/openai';
import { json } from '@sveltejs/kit';

export async function GET() {
	try {
		const completion = await openai.chat.completions.create({
			messages: [{ role: 'user', content: 'Generate a programming idea in up to 10 words' }],
			model: 'gpt-4o-mini'
		});

		return json({ idea: completion.choices[0].message.content });
	} catch (error) {
		console.log('Error generating idea: ', error);
		return json({ error: 'Failed to generate idea' }, { status: 500 });
	}
}
