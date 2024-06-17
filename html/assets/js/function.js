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
			openAccordion(accordion);
		}
	};
});


/* 커스텀 셀렉트 */
function initializeCustomSelect() {
  const selectBoxElements = document.querySelectorAll(".select-dropdown__inner");

  function toggleSelectBox(selectBox) {
    const allSelectBoxElements = document.querySelectorAll(".select-dropdown__inner");

    allSelectBoxElements.forEach(boxElement => {
      if (boxElement !== selectBox) {
        boxElement.classList.remove("expanded");
      }
    });

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
}

document.addEventListener('DOMContentLoaded', function() {
  initializeCustomSelect();
});


/* 버튼 Drop Down */
const buttonBoxElements = document.querySelectorAll(".button-dropdown__inner");

function toggleButtonBox(buttonBox) {
  buttonBoxElements.forEach(boxElement => {
    if (boxElement !== buttonBox) {
      boxElement.classList.remove("expanded");
    }
  });

  buttonBox.classList.toggle("expanded");
}

buttonBoxElements.forEach(buttonBox => {
  buttonBox.addEventListener("click", function (e) {
    toggleButtonBox(buttonBox);
  });
});

document.addEventListener("click", function (e) {
  const targetElement = e.target;
  const isSelect = targetElement.classList.contains("button-dropdown__inner") || targetElement.closest(".button-dropdown__inner");

  if (!isSelect) {
    buttonBoxElements.forEach(boxElement => {
      boxElement.classList.remove("expanded");
    });
  }
});

/* INPUT Clear */
function initializeInputClear() {
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
}

/* Modal - Page Call */
document.addEventListener('DOMContentLoaded', function() {
  var modalDialog = document.getElementById('modal-dialog');
  var modalDcontent = document.querySelector('.modal-dialog__wrapper');
  var modalDbody = document.getElementById('modalWrapper');
  var buttons = document.getElementsByClassName('js-openModalBtn');

  Array.prototype.forEach.call(buttons, function(button) {
      button.addEventListener('click', function() {
          var url = button.getAttribute('data-url');
          var xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.onreadystatechange = function() {
              if (xhr.readyState === 4) {
                  if (xhr.status === 200) {
                      modalDbody.innerHTML = xhr.responseText;
                      modalDialog.style.display = 'block';
                      document.body.classList.add('overflow-hidden');
                      setTimeout(function() {
                        modalDcontent.classList.add('open');
                      }, 10);

                      var closeBtn = modalDbody.querySelector('.modal-dialog__close');
                      if (closeBtn) {
                          closeBtn.addEventListener('click', function() {
                              modalDcontent.classList.remove('open');
                              document.body.classList.remove('overflow-hidden');
                              setTimeout(function() {
                                modalDialog.style.display = 'none';
                              }, 500);
                          });
                      }

                      // 동적으로 로드된 콘텐츠 내의 스크립트를 실행하는 함수
                      var scripts = modalDbody.getElementsByTagName('script');
                      for (var i = 0; i < scripts.length; i++) {
                          eval(scripts[i].textContent);
                      }                      

                      // 동적으로 로드된 콘텐츠에 대해 autoResizeTextarea 및 js-input-clear 재실행
                      autoResizeTextarea();
                      initializeInputClear();
                      initializeCustomSelect();
                  } else {
                      modalDbody.innerHTML = '<p>Failed to load content.</p>';
                      modalDialog.style.display = 'block';
                      setTimeout(function() {
                          modalDcontent.classList.add('show');
                      }, 10);
                  }
              }
          };
          xhr.send();
      });
  });

  window.addEventListener('click', function(event) {
      if (event.target == modalDialog) {
          modalDcontent.classList.remove('show');
          setTimeout(function() {
            modalDialog.style.display = 'none';
          }, 500);
      }
  });

  // 초기 페이지 로드 시 input clear 초기화
  initializeInputClear();
});

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
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  });
}

document.addEventListener('DOMContentLoaded', autoResizeTextarea);
