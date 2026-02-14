
export async function submitToBing(urls: string[]) {
    const apiKey = process.env.BING_API_KEY;
    const siteUrl = 'https://whoisalfaz.me';

    if (!apiKey) {
        throw new Error('BING_API_KEY is missing in environment variables.');
    }

    const endpoint = `https://ssl.bing.com/webmaster/api.svc/json/SubmitUrlbatch?apikey=${apiKey}`;

    const payload = {
        siteUrl: siteUrl,
        urlList: urls
    };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Charset': 'utf-8'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Bing API Error: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Failed to submit URLs to Bing:', error);
        throw error;
    }
}
