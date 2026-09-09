export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { CallerId, InboundStateCode, InboundZipCode } = req.query;

    // Base target URL provided
    const targetUrl = new URL('https://bid.callgrid.com/api/bid/cmtnk29xm07lq06k0okc3hlvi');
    
    if (CallerId) targetUrl.searchParams.append('CallerId', CallerId);
    if (InboundStateCode) targetUrl.searchParams.append('InboundStateCode', InboundStateCode);
    if (InboundZipCode) targetUrl.searchParams.append('InboundZipCode', InboundZipCode);

    try {
        const apiResponse = await fetch(targetUrl.toString(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        const data = await apiResponse.json();
        return res.status(200).json({
            success: true,
            upstreamStatus: apiResponse.status,
            data: data
        });
    } catch (error) {
        return res.status(500).json({ 
            success: false, 
            error: error.message 
        });
    }
}
