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
        const slidesContainer = document.querySelector('.profile-slides');
        const currentSliderWrapper = document.querySelector('.profile-slider-wrapper');
        const dots = document.querySelectorAll('.dot-btn');
        const slides = document.querySelectorAll('.profile-slide');

        if (!slidesContainer || slides.length === 0) return;

        const safeIndex = Math.max(0, Math.min(index, slides.length - 1));

        // 모든 슬라이드가 숨겨지거나 접히지 않도록 명시적으로 확보
        slides.forEach((slide) => {
            slide.style.display = 'block';
            slide.style.height = 'auto';
            slide.style.overflow = 'visible';
            slide.style.flex = '0 0 100%';
            slide.style.minWidth = '100%';
            slide.style.maxWidth = '100%';
        });

        // 가로 슬라이드 이동 (강제 height 지정 없이 흰색 네모칸 높이에 맡김)
        slidesContainer.style.display = 'flex';
        slidesContainer.style.height = '';
        slidesContainer.style.transform = `translateX(-${safeIndex * 100}%)`;

        // 번호 버튼 활성화 상태 변경
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === safeIndex);
        });

        // 스크롤 상단(0) 초기화 및 실제 넘칠 때만 스크롤 허용
        requestAnimationFrame(() => {
            const activeSlide = slides[safeIndex];
            if (!activeSlide || !currentSliderWrapper) return;

            currentSliderWrapper.scrollTop = 0;

            const slideHeight = activeSlide.scrollHeight;
            const wrapperHeight = currentSliderWrapper.clientHeight;
            currentSliderWrapper.style.overflowY = slideHeight > wrapperHeight + 1 ? 'auto' : 'hidden';
        });
    };
});