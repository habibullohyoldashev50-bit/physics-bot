export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message } = req.body;

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.CLAUDE_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-opus-4-6',
                max_tokens: 1024,
                system: `Sen fizika va muhandislik bo'yicha mutaxassis assistantsan. 
                Savollarni o'zbek tilida, oddiy va tushunarli tarzda tushuntir. 
                Formulalar va misollar keltir. Faqat fizika, matematika va 
                muhandislik mavzularida javob ber.`,
                messages: [{ role: 'user', content: message }]
            })
        });

        const data = await response.json();
        const reply = data.content[0].text;
        res.status(200).json({ reply });

    } catch (error) {
        res.status(500).json({ error: 'Xatolik yuz berdi' });
    }
}
