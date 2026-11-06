document.addEventListener("DOMContentLoaded", () => {

    // 1. إدارة التنقل والسكرول (Section Snapping)
    const container = document.querySelector('.main-container');
    const sections = document.querySelectorAll('.page-section');
    const dots = document.querySelectorAll('.dot');

    container.addEventListener('scroll', () => {
        const index = Math.round(container.scrollTop / window.innerHeight);
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // تشغيل الكتابة التلقائية بمجرد الوصول للقسم الثاني
        if (index === 1 && !hasTyped) {
            typeWriter();
            hasTyped = true;
        }
    });

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const idx = dot.getAttribute('data-index');
            sections[idx].scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 2. تفاعل القلب والعداد
    let heartClicks = 0;
    const heartBtn = document.getElementById('heartBtn');
    const counterText = document.getElementById('counterText');

    heartBtn.addEventListener('click', () => {
        heartClicks++;
        if (heartClicks === 1) {
            counterText.innerText = "كمان؟ 💕 وأنا بحبك أكتر";
        } else {
            counterText.innerText = `${heartClicks} قلوب ❤️ وأنا بحبك أكتر`;
        }
    });

    // 3. كتابة الرسالة على الورقة (Typewriter Effect)
    const textToType = "حبيبتي جوجو\n\nما بعرف من وين بلّش... بس بعرف إنو من يوم ما دخلتي حياتي، صار للأيام طعم تاني.\n\nبحب ضحكتك لما تحاولي تخبيها، وبحب كيف بتسمعيني حتى لما ما بيكون خلق لأي شي.";
    let charIdx = 0;
    let hasTyped = false;
    const typedEl = document.getElementById('typedMessage');

    function typeWriter() {
        if (charIdx < textToType.length) {
            typedEl.innerHTML += textToType.charAt(charIdx);
            charIdx++;
            setTimeout(typeWriter, 45);
        }
    }

    // 4. حاسبة الأيام والوقت
    function startTimer() {
        const startDate = new Date('2026-02-12T00:00:00');
        
        function update() {
            const now = new Date();
            const diff = now - startDate;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            document.getElementById('daysVal').innerText = days;
            document.getElementById('hourVal').innerText = hours.toString().padStart(2, '0');
            document.getElementById('minVal').innerText = minutes.toString().padStart(2, '0');
            document.getElementById('secVal').innerText = seconds.toString().padStart(2, '0');
        }
        
        update();
        setInterval(update, 1000);
    }
    startTimer();

    // 5. تقليب كروت "ليش بحبك"
    const reasons = [
        "ضحكتك بتنسيني تعب اليوم كله",
        "بتفهميني من نظرة، بلا ولا كلمة",
        "إلك أحن قلب عرفتو",
        "وجودك جنبي بيخليني أمان الدنيا",
        "بحب حكيك وهبلنا مع بعض",
        "لأنك إنتي وطني ونتيجة كل شي حلو",
        "بعشق تفاصيلك الصغيرة اللي بتخليكي كبيرة بعيني",
        "ياحظي فيكي",
        "انتي اميرة قلببي وحياتي وروحي",
        "بهواكي وبموت فيكي وبحبك حب ما بينوصف",
        "لأنك سبب سعادتي وابتسامتي",
        "بحبك حب ما بينوصف بالكلام",
    ];
    let cardIdx = 0;
    const reasonCard = document.getElementById('reasonCard');
    const cardNum = document.getElementById('cardNum');
    const cardText = document.getElementById('cardText');
    const cardsProgress = document.getElementById('cardsProgress');

    const arabicNumbers = ["١", "٢", "٣", "٤", "٥", "٦"];

    reasonCard.addEventListener('click', () => {
        cardIdx = (cardIdx + 1) % reasons.length;
        
        // تأثير أنيق عند الضغط
        reasonCard.style.transform = "scale(0.95)";
        setTimeout(() => {
            cardNum.innerText = arabicNumbers[cardIdx];
            cardText.innerText = reasons[cardIdx];
            cardsProgress.innerText = `${cardIdx + 1} من ${reasons.length}`;
            reasonCard.style.transform = "scale(1)";
        }, 150);
    });
});