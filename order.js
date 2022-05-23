
  let onlyLettersRgx = /^[A-Za-z]+$/;
  let lettersAndNumbersRgx = /^[0-9a-zA-Z]+$/;
  let positiveNumberRgx = /^[1-9]+[0-9]*$/;
  let positiveNumberAndDashRgx = /^[1-9–]+[-0-9–]*$/;
  let checkedCounter = 0;


  let validated = {
      name: false,
      sname: false,
      ddate: false,
      street: false,
      house: false,
      flat: false,
      ptype: false,
      gift: false
  };

function main_validation(id,type,error_id) {
    var el = document.getElementById(id);
    
    switch (type) {
        case 'name':
                validate(el,4,error_id);
            break;
        case 'surname':
                validate(el,5,error_id);
            break;
        case 'street':
                validate(el,5,error_id,false);
            break;
        case 'house':
                validateNumbers(el,error_id);
            break;
        case 'flat':
                validateNumbers(el,error_id,true);
            break;
        case 'delivery':
                const today = new Date();
                const selectedDate = new Date(el.value);
                validateDate(today,selectedDate, error_id);
            break;
    
        default:
            break;
    }
}

function checkEmpty(element)                  { return element.value.length == 0 ;                       }
function checkString(element)                 { return element.value.match(onlyLettersRgx);              }
function checkSize(element, size)             { return element.value.length < size;                      }
function checkPosNumbers(element)             { return element.value.match(positiveNumberRgx);           }
function checkPosNumbersWithDashes(element)   { return element.value.match(positiveNumberAndDashRgx);    }

function validate(el,size,error_id,stringCheck=true) {
    var err = document.getElementById(error_id);
    if (checkEmpty(el)) {
        err.style.display = 'block';
        err.innerHTML = 'carielia';
    } else if (checkSize(el,size)) {
        err.style.display = 'block';
        if(!checkString(el) && stringCheck) {
            err.innerHTML = `marto stringiiii, naklebia ${size}-ze`;
        } else {
            err.innerHTML = `naklebia ${size}-ze`;
        }
    } else if (!checkString(el) && stringCheck) {
        err.style.display = 'block';
        err.innerHTML = 'marto stringiiii';
    } else {
        err.style.display = 'none';
    }
}

function validateDate(date1, date2, error_id) {
    var err = document.getElementById(error_id);

    date1.setHours(date1.getHours() - date1.getHours());
    date1.setMinutes(date1.getMinutes() - date1.getMinutes());
    date1.setSeconds(date1.getSeconds() - date1.getSeconds());

    date2.setHours(date2.getHours() - date2.getHours());
    date2.setMinutes(date2.getMinutes() - date2.getMinutes());
    date2.setSeconds(date2.getSeconds() - date2.getSeconds());

    if (date2 <= date1) {
        err.style.display = 'block';
        err.innerHTML = 'xvalidan';
    } else {
        err.style.display = 'none';
    }
}

function validateNumbers(el,error_id, dashes=false) {
    var err = document.getElementById(error_id);
    if (dashes) {
        if (checkEmpty(el)) {
            err.style.display = 'block';
            err.innerHTML = 'carielia';
        } else  if ( !checkPosNumbersWithDashes(el) ) {
            err.style.display = 'block';
            err.innerHTML = 'mxolod dadebiti';
        } else {
            err.style.display = 'none';
        }
    } else {
        if (checkEmpty(el)) {
            err.style.display = 'block';
            err.innerHTML = 'carielia';
        } else  if ( !checkPosNumbers(el) ) {
            err.style.display = 'block';
            err.innerHTML = 'mxolod dadebiti';
        } else {
            err.style.display = 'none';
        }
    }
}

function validateCheckBoxes(checkedLenhtg, error_id) {
    let checkedCounter = 0;
    var checkboxes = document.getElementById('gift').getElementsByClassName('checkbox');
    var err = document.getElementById(error_id);
    
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            checkedCounter++;
        }
    }
    if ( checkedCounter <= checkedLenhtg) {
        err.style.display = 'none';
    } else {
        err.style.display = 'block';
        err.innerHTML = 'carielia';
    }
}

