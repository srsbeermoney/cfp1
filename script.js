async function convertCurrency() {
    const usdAmount = document.getElementById('usd').value;
    const resultDiv = document.getElementById('result');
    const loadingDiv = document.getElementById('loading');
    
    if (!usdAmount || isNaN(usdAmount)) {
        resultDiv.innerHTML = '<span class="error">Please enter a valid amount</span>';
        return;
    }
    
    loadingDiv.style.display = 'block';
    resultDiv.innerHTML = '';
    
    try {
        // Using a free API to get the latest exchange rate
        const apiUrl = 'https://api.currencyapi.com/v3/latest';
        const params = new URLSearchParams({
            apikey: '75689bac3adc976d41ca268587fe1fed', // Replace with your actual API key
            base_currency: 'USD',
            currencies: 'INR'
        });
        
        // Use fetch with appropriate headers for CORS
        const response = await fetch(`${apiUrl}?${params}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        
        // Get the INR rate
        const inrRate = data.data.INR.value;
        const convertedAmount = (usdAmount * inrRate).toFixed(2);
        
        resultDiv.innerHTML = `${usdAmount} USD = ${convertedAmount} INR`;
    } catch (error) {
        console.error('Conversion error:', error);
        resultDiv.innerHTML = '<span class="error">Error fetching exchange rate. Please try again later.</span>';
    } finally {
        loadingDiv.style.display = 'none';
    }
}