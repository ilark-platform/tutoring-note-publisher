"use strict";

/*
const metaLink = document.createElement('meta');
metaLink.setAttribute('name', 'theme-color');
metaLink.content = "#ffffff";
document.getElementsByTagName('head')[0].prepend(metaLink);
*/





/** 브라우저의 스크린 Height 값을 구함 : 로그인, 회원가입 레이아웃에 사용
function setScreenSize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setScreenSize();
window.addEventListener('resize', () => setScreenSize());
*/

let sbartrigger = document.querySelector('.js-drawer-trigger');
let sbarclose = document.querySelector('.js-drawer-close');
let sidebar = document.querySelector('.sidebar');
let dimlayer = document.querySelector('.dim-layer');

if(sidebar){
  let classOpen = [sidebar, dimlayer];

  sbartrigger.addEventListener('click', function(e){
    classOpen.forEach(e => e.classList.add('is-active'));
    document.body.classList.add('overflow-hidden');
  });

  let classCloseClick = [dimlayer, sbarclose];
  classCloseClick.forEach(function(el) {
    el.addEventListener('click', function(els) {
      classOpen.forEach(els => els.classList.remove('is-active'));
      document.body.classList.remove('overflow-hidden');
    });
  });
}


/* Modal */
document.addEventListener('click', function (e) {
  e = e || window.event;
  var target = e.target || e.srcElement;

  if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'modal') {
      if (target.hasAttribute('data-target')) {
          var m_ID = target.getAttribute('data-target');
          document.getElementById(m_ID).classList.add('open');
          e.preventDefault();
      }
  }

  if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'modal') || target.classList.contains('modal')) {
      var modal = document.querySelector('[class="modal open"]');
      modal.classList.remove('open');
      e.preventDefault();
  }
}, false);


/* 아코디언 게시판 */
const accordions = document.querySelectorAll(".accordion__item");

const openAccordion = (accordion) => {
	const content = accordion.querySelector(".accordion__content");
	accordion.classList.add("accordion__active");
	content.style.maxHeight = content.scrollHeight + "px";
};

const closeAccordion = (accordion) => {
	const content = accordion.querySelector(".accordion__content");
	accordion.classList.remove("accordion__active");
	content.style.maxHeight = null;
};

accordions.forEach((accordion) => {
	const intro = accordion.querySelector(".accordion__intro");
	const content = accordion.querySelector(".accordion__content");

	intro.onclick = () => {
		if (content.style.maxHeight) {
			closeAccordion(accordion);
		} else {
			//accordions.forEach((accordion) => closeAccordion(accordion));
			openAccordion(accordion);
		}
	};
});


/* 커스텀 셀렉트 */
const selectBoxElements = document.querySelectorAll(".select-dropdown__inner");

function toggleSelectBox(selectBox) {
  selectBox.classList.toggle("expanded");
}

function selectOption(optionElement) {
  const selectBox = optionElement.closest(".select-dropdown__inner");
  const selectedElement = selectBox.querySelector(".select-dropdown__label");
  selectedElement.textContent = optionElement.textContent;
}

selectBoxElements.forEach(selectBoxElement => {
  selectBoxElement.addEventListener("click", function (e) {
    const targetElement = e.target;
    const isOptionElement = targetElement.classList.contains("select-dropdown__item");

    if (isOptionElement) {
      selectOption(targetElement);
    }

    toggleSelectBox(selectBoxElement);
  });
});

document.addEventListener("click", function (e) {
  const targetElement = e.target;
  const isSelect = targetElement.classList.contains("select-dropdown__inner") || targetElement.closest(".select-dropdown__inner");

  if (isSelect) {
    return;
  }

  const allSelectBoxElements = document.querySelectorAll(".select-dropdown__inner");

  allSelectBoxElements.forEach(boxElement => {
    boxElement.classList.remove("expanded");
  });
});


/* 버튼 Drop Down */
const buttonBoxElements = document.querySelectorAll(".button-dropdown__inner");

function toggleButtonBox(buttonBox) {
  buttonBox.classList.toggle("expanded");
}

buttonBoxElements.forEach(buttonBoxElements => {
  buttonBoxElements.addEventListener("click", function (e) {
    toggleButtonBox(buttonBoxElements);
  });
});

document.addEventListener("click", function (e) {
  const targetElement = e.target;
  const isSelect = targetElement.classList.contains("button-dropdown__inner") || targetElement.closest(".button-dropdown__inner");

  if (isSelect) {
    return;
  }

  const buttonBoxElements = document.querySelectorAll(".button-dropdown__inner");

  buttonBoxElements.forEach(boxElement => {
    boxElement.classList.remove("expanded");
  });
});


/* 인풋 초기화 */
const clearInput = document.getElementsByClassName('field-group__clear');
for(let i = 0; i < clearInput.length; i++){
  (function(i){
    clearInput[i].onclick = function(){
      clearInput[i].parentNode.getElementsByClassName('field-group__input')[0].value = ''; 
    };
  })(i);
}

