"use strict";

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


/* Bottom Sheet */
document.addEventListener('click', function (e) {
  e = e || window.event;
  var target = e.target || e.srcElement;

  if (target.hasAttribute('data-toggle') && target.getAttribute('data-toggle') == 'bottom-sheet') {
      if (target.hasAttribute('data-target')) {
          var bt_ID = target.getAttribute('data-target');
          document.getElementById(bt_ID).classList.add('open');
          document.body.classList.add('overflow-hidden');
          e.preventDefault();
      }
  }

  //if ((target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'bottom-sheet') || target.classList.contains('bottom-sheet')) {
  if (target.hasAttribute('data-dismiss') && target.getAttribute('data-dismiss') == 'bottom-sheet') {
      var bottomSheet = document.querySelector('.bottom-sheet.open');
      if (bottomSheet) {
          bottomSheet.classList.add('hide');

          bottomSheet.addEventListener('transitionend', function handler() {
              bottomSheet.classList.remove('open');
              bottomSheet.classList.remove('hide');
              document.body.classList.remove('overflow-hidden');
              bottomSheet.removeEventListener('transitionend', handler);
          });
      }
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
  // 모든 버튼 박스를 닫는다
  buttonBoxElements.forEach(boxElement => {
    if (boxElement !== buttonBox) {
      boxElement.classList.remove("expanded");
    }
  });

  // 클릭된 버튼 박스의 상태를 토글한다
  buttonBox.classList.toggle("expanded");
}

// 각 버튼 박스에 클릭 이벤트 핸들러를 추가한다
buttonBoxElements.forEach(buttonBox => {
  buttonBox.addEventListener("click", function (e) {
    //e.stopPropagation(); // 이벤트가 상위 요소로 전파되는 것을 막는다
    toggleButtonBox(buttonBox);
  });
});

// 문서 전체에 클릭 이벤트 핸들러를 추가한다
document.addEventListener("click", function (e) {
  const targetElement = e.target;
  const isSelect = targetElement.classList.contains("button-dropdown__inner") || targetElement.closest(".button-dropdown__inner");

  if (!isSelect) {
    // 버튼 박스 외부를 클릭했을 때 모든 버튼 박스를 닫는다
    buttonBoxElements.forEach(boxElement => {
      boxElement.classList.remove("expanded");
    });
  }
});


/* INPUT Clear */
const clearInputs = document.getElementsByClassName('js-input-clear');
for (let i = 0; i < clearInputs.length; i++) {
  clearInputs[i].onclick = function () {
    const parent = clearInputs[i].parentNode;
    const fieldGroup1 = parent.getElementsByClassName('field-group__input')[0];
    const fieldGroup2 = parent.getElementsByClassName('field-group2__input')[0];
    
    if (fieldGroup1) {
      fieldGroup1.value = '';
    }
    
    if (fieldGroup2) {
      fieldGroup2.value = '';
    }
  };
}


/* TEXTAREA Height Auto */
function autoResizeTextarea() {
  const textareas = document.querySelectorAll('.js-auto-resize');
  if (!textareas.length) return;

  function autoResize(event) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  textareas.forEach(textarea => {
    textarea.addEventListener('input', autoResize);
    // 초기 높이 설정
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  });
}

document.addEventListener('DOMContentLoaded', autoResizeTextarea);
