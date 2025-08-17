# 🚀 Deployment Guide for Netlify

## **Environment Variables Setup**

### **Required Environment Variable:**

Create a `.env` file in your project root with:

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

**Replace `your-backend-url` with your actual backend URL from Render.**

## **Netlify Deployment Steps:**

1. **Connect your GitHub repository to Netlify**
2. **Set environment variables in Netlify:**
   - Go to Site Settings > Environment Variables
   - Add: `VITE_API_BASE_URL` = `https://your-backend-url.onrender.com/api`
3. **Deploy automatically on git push**

## **What's Fixed:**

✅ **Export error resolved** - adminApi now properly exported  
✅ **No hardcoded URLs** - All URLs use environment variables  
✅ **Secure for public deployment** - No secrets exposed  
✅ **Better error handling** - 10 second timeout and user-friendly messages  

## **Testing:**

1. **Set environment variable in Netlify**
2. **Deploy your site**
3. **Check browser console for:** "Fetching movies from: [your-backend-url]"
4. **Movies should load within 10 seconds**

## **Need Help?**

- Verify your backend URL is accessible
- Check Netlify environment variables are set correctly
- Ensure backend has CORS enabled for your Netlify domain
