document.addEventListener("DOMContentLoaded", function() {
    // 1. 상단 메인 탭 전환 함수
    window.openTab = function(evt, tabName) {
        const panes = document.querySelectorAll('.tab-pane');
        panes.forEach(pane => pane.classList.remove('active'));

        const buttons = document.querySelectorAll('.tab-btn');
        buttons.forEach(btn => btn.classList.remove('active'));

        document.getElementById(tabName).classList.add('active');
        evt.currentTarget.classList.add('active');
    };

    // 2. LAB equipment 탭 내부 프로필 슬라이드 이동 함수
    window.currentProfileSlide = function(index) {
        const slidesContainer = document.querySelector('.profile-slides');
        const dots = document.querySelectorAll('.dot-btn');

        if (!slidesContainer) return;

        // 가로 슬라이드 이동
        slidesContainer.style.transform = `translateX(-${index * 100}%)`;

        // 번호 버튼 활성화 상태 변경
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };
});