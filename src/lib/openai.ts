import OpenAI from 'openai';
import { OPENAI_KEY } from '$env/static/private';

const openai = new OpenAI({
	apiKey: OPENAI_KEY
});

export default openai;
