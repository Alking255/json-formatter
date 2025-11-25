# 🚀 خطوات النشر بعد تثبيت Git

## ✅ بعد تثبيت Git مباشرة

### 1. تهيئة المشروع

افتح **PowerShell** في مجلد المشروع (أو اضغط Shift + Right Click في المجلد → "Open PowerShell window here"):

```powershell
# الانتقال للمجلد (إذا لم تكن فيه)
cd C:\Users\osc\Desktop\web-tool

# تعريف نفسك لـ Git (مرة واحدة فقط)
git config --global user.name "YOUR_NAME"
git config --global user.email "YOUR_EMAIL@example.com"

# تهيئة المشروع
git init

# إضافة جميع الملفات
git add .

# إنشاء أول commit
git commit -m "Initial commit: JSON Formatter Platform"
```

---

### 2. إنشاء Repository على GitHub

1. افتح: https://github.com/new
2. اسم المستودع: **json-formatter**
3. اجعله **Public** ✅
4. **لا تضيف** README أو .gitignore أو License
5. اضغط **Create repository**

---

### 3. ربط المشروع وRفعه

**GitHub سيعطيك الأوامر بعد إنشاء Repository**، لكن هذه هي الأوامر العامة:

```powershell
# استبدل YOUR_USERNAME باسم المستخدم على GitHub
git remote add origin https://github.com/YOUR_USERNAME/json-formatter.git

# رفع الكود
git branch -M main
git push -u origin main
```

**ملاحظة**: عند أول `git push`، سيطلب منك:
- **Username**: اسم المستخدم على GitHub
- **Password**: استخدم **Personal Access Token** وليس كلمة المرور!

---

### 4. الحصول على Personal Access Token

إذا لم يكن لديك واحد:

1. افتح: https://github.com/settings/tokens
2. اضغط **Generate new token (classic)**
3. اختر:
   - Note: `Vercel Deployment`
   - Expiration: `No expiration` (أو 90 days)
   - Scopes: اختر **repo** ✅
4. اضغط **Generate token**
5. **انسخ الـ Token فوراً** (لن تراه مرة أخرى!)
6. استخدمه بدل كلمة المرور عند `git push`

---

### 5. النشر على Vercel

1. افتح: https://vercel.com/new
2. اضغط **Import Git Repository**
3. اختر **json-formatter** من القائمة
4. اضغط **Import**
5. اترك الإعدادات كما هي (Vercel يكتشف Next.js تلقائياً)
6. اضغط **Deploy** 🚀
7. انتظر 1-2 دقيقة

✅ **ستحصل على رابط مثل**: `https://json-formatter-abc123.vercel.app`

---

### 6. تحديث URLs (مهم!)

بعد النشر، أخبرني بالرابط وسأحدث الملفات تلقائياً!

أو يمكنك تحديثها يدوياً في:
- `app/sitemap.ts` - السطر 4
- `app/layout.tsx` - السطر 36، 59
- `app/robots.ts` - السطر 7

ثم:
```powershell
git add .
git commit -m "Update production URLs"
git push
```

Vercel سينشر التحديثات تلقائياً! ✅

---

## 🎉 تم!

موقعك الآن على الإنترنت! 🌍

**الخطوات التالية**:
1. ✅ اختبر الموقع
2. ✅ سجل في Google AdSense
3. ✅ حدّث Ad IDs (راجع `AD-SETUP-GUIDE.md`)
4. ✅ ابدأ في جلب الزوار!

---

**محتاج مساعدة؟ أنا هنا!** 😊
