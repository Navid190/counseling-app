"""
API Keys Testing Script
Tests Google AI Studio and Cerebras Cloud API keys
"""

import google.generativeai as genai
import requests
import sys

# API Keys
API_KEYS = {
    'google_ai': 'AIzaSyA9Pi7tw_4GcyzThAqcaHbDCxYO5WvgFWk',
    'cerebras': 'csk-5r8kkcr9chkptvx4cytphk9m3ypcfx5jnnryddhm6kfr6559'
}

def test_google_ai():
    """Test Google AI Studio API"""
    print("=" * 60)
    print("Testing Google AI Studio (Gemini Pro)")
    print("=" * 60)
    
    try:
        genai.configure(api_key=API_KEYS['google_ai'])
        model = genai.GenerativeModel('gemini-pro')
        response = model.generate_content("Say 'Hello from Google AI!' in one sentence.")
        
        print("✓ Status: SUCCESS")
        print(f"✓ Response: {response.text}")
        print(f"✓ API Key: {API_KEYS['google_ai'][:20]}...")
        return True
    except Exception as e:
        print("✗ Status: FAILED")
        print(f"✗ Error: {str(e)}")
        return False

def test_cerebras():
    """Test Cerebras Cloud API"""
    print("\n" + "=" * 60)
    print("Testing Cerebras Cloud (Llama 3.1)")
    print("=" * 60)
    
    try:
        url = "https://api.cerebras.ai/v1/chat/completions"
        headers = {
            "Authorization": f"Bearer {API_KEYS['cerebras']}",
            "Content-Type": "application/json"
        }
        data = {
            "model": "llama3.1-8b",
            "messages": [
                {"role": "user", "content": "Say 'Hello from Cerebras!' in one sentence."}
            ],
            "temperature": 0.7,
            "max_tokens": 50
        }
        
        response = requests.post(url, json=data, headers=headers, timeout=30)
        result = response.json()
        
        if response.status_code == 200:
            print("✓ Status: SUCCESS")
            print(f"✓ Response: {result['choices'][0]['message']['content']}")
            print(f"✓ API Key: {API_KEYS['cerebras'][:20]}...")
            return True
        else:
            print("✗ Status: FAILED")
            print(f"✗ HTTP Status: {response.status_code}")
            print(f"✗ Error: {result.get('error', {}).get('message', 'Unknown error')}")
            return False
    except Exception as e:
        print("✗ Status: FAILED")
        print(f"✗ Error: {str(e)}")
        return False

def test_atlassian_note():
    """Note about Atlassian API"""
    print("\n" + "=" * 60)
    print("Atlassian API Token (NOT USED)")
    print("=" * 60)
    print("ℹ The Atlassian token is for Jira/Confluence only,")
    print("  not for AI chat services. It's not tested here.")
    print("  Token: ATATT3xFfGF0PXOB2qsz...")

if __name__ == "__main__":
    print("\n🤖 AI COUNSELING APP - API KEYS TEST\n")
    
    # Test Google AI
    google_ok = test_google_ai()
    
    # Test Cerebras
    cerebras_ok = test_cerebras()
    
    # Atlassian note
    test_atlassian_note()
    
    # Summary
    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    print(f"Google AI Studio: {'✓ WORKING' if google_ok else '✗ FAILED'}")
    print(f"Cerebras Cloud:   {'✓ WORKING' if cerebras_ok else '✗ FAILED'}")
    print(f"Atlassian Token:  ℹ NOT USED (Project management only)")
    print("=" * 60)
    
    if google_ok or cerebras_ok:
        print("\n✓ At least one AI provider is working!")
        print("  The app will use working providers with automatic fallback.")
        sys.exit(0)
    else:
        print("\n✗ No AI providers are working!")
        print("  Please check your API keys and internet connection.")
        sys.exit(1)
