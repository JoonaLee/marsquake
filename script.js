document.addEventListener("DOMContentLoaded", function() {
    const sliderWrapper = document.querySelector('.profile-slider-wrapper');
    const tabContent = document.querySelector('.tab-content');

    function resetScrollPositions() {
        requestAnimationFrame(() => {
            if (sliderWrapper) {
                sliderWrapper.scrollTop = 0;
            }
            if (tabContent) {
                tabContent.scrollTop = 0;
            }
            window.scrollTo(0, 0);
        });
    }

    // 1. 상단 메인 탭 전환 함수
    window.openTab = function(evt, tabName) {
        const panes = document.querySelectorAll('.tab-pane');
        panes.forEach(pane => pane.classList.remove('active'));

        const buttons = document.querySelectorAll('.tab-btn');
        buttons.forEach(btn => btn.classList.remove('active'));

        const targetPane = document.getElementById(tabName);
        if (targetPane) {
            targetPane.classList.add('active');
        }
        if (evt && evt.currentTarget) {
            evt.currentTarget.classList.add('active');
        }

        // 탭 전환 시 스크롤 위치 초기화
        resetScrollPositions();
    };

// 2. LAB equipment 탭 내부 프로필 슬라이드 이동 함수
    window.currentProfileSlide = function(index) {
        const currentSliderWrapper = document.querySelector('.profile-slider-wrapper');
        const dots = document.querySelectorAll('.dot-btn');
        const slides = document.querySelectorAll('.profile-slide');

        if (slides.length === 0) return;

        const safeIndex = Math.max(0, Math.min(index, slides.length - 1));

        // 선택한 슬라이드만 active 처리 (나머지는 display: none으로 높이 제거)
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === safeIndex);
        });

        // 번호 버튼 활성화 상태 변경
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === safeIndex);
        });

        // 페이지 전환 시 스크롤 위치를 맨 위로 초기화
        if (currentSliderWrapper) {
            currentSliderWrapper.scrollTop = 0;
        }
    };
});