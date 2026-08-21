const SUPABASE_URL = 'eyyxkwcmqcgapjujpfdj';
const SUPABASE_ANON_KEY = 'sb_publishable_eJIh9HPIWtRAfWmzA96qUQ_jWoDcjZB';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const authModal = document.getElementById('authModal');
const contactModal = document.getElementById('contactModal');
const openAuthModalBtn = document.getElementById('openAuthModal');
const openContactModalBtn = document.getElementById('openContactModal');
const authForm = document.getElementById('authForm');
const stepRole = document.getElementById('stepRole');
const modalTitle = document.getElementById('modalTitle');
const freelancerExtraFields = document.getElementById('freelancerExtraFields');
const ageGroup = document.getElementById('ageGroup');

// التنقل بين الصفحات
function showSection(sectionId) {
    document.querySelectorAll('.page-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

// التحكم في النوافذ المنبثقة
openAuthModalBtn.addEventListener('click', () => {
    authModal.classList.add('active');
    stepRole.style.display = 'block';
    authForm.style.display = 'none';
    modalTitle.innerText = "تسجيل حساب جديد";
});

openContactModalBtn.addEventListener('click', () => contactModal.classList.add('active'));

window.addEventListener('click', (e) => {
    if (e.target === authModal) authModal.classList.remove('active');
    if (e.target === contactModal) contactModal.classList.remove('active');
});

// اختيار الدور في النافذة
function selectRole(role) {
    stepRole.style.display = 'none';
    authForm.style.display = 'block';
    
    if (role === 'client') {
        modalTitle.innerText = "تسجيل حساب عميل";
        ageGroup.style.display = 'none';
        freelancerExtraFields.style.display = 'none';
    } else {
        modalTitle.innerText = "تسجيل حساب فري لانسر";
        ageGroup.style.display = 'block';
        freelancerExtraFields.style.display = 'block';
    }
}
// كود إرسال البيانات إلى Supabase عند الضغط على زر التسجيل
const form = document.getElementById('authForm'); // تأكد إن ده أيدي الفورم عندك أو زر التسجيل

if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // جلب البيانات من الحقول (تأكد من مطابقة الـ IDs مع ملف الـ HTML)
        const name = document.getElementById('name')?.value;
        const age = document.getElementById('age')?.value;
        const email = document.getElementById('email')?.value;
        const skills = document.getElementById('skills')?.value;

        // إرسال البيانات للجدول freelancer 1
        const { data, error } = await supabase
            .from('freelancer 1')
            .insert([
                { name: name, age: age ? parseInt(age) : null, email: email, skills: skills, status: 'pending' }
            ]);

        if (error) {
            console.error('خطأ في التسجيل:', error);
            alert('حدث خطأ أثناء التسجيل، حاول مرة أخرى.');
        } else {
            alert('تم التسجيل بنجاح!');
            form.reset(); // تفريغ الحقول بعد التسجيل
        }
    });
}