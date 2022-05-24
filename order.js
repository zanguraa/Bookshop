
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

  let customer_mame = '';
  let customer_surname = '';
  let customer_street = '';
  let customer_house = '';
  let customer_flat = '';

function main_validation(id,type,error_id) {
    var el = document.getElementById(id);
    
    switch (type) {
        case 'name':
                if ( validate(el,4,error_id) ) {
                    customer_name = el.value;
                    validated.name = true;
                } else {
                    customer_name = '';
                    validated.name = false;
                }
                document.getElementById('complete_btn').disabled = !showBtn();
            break;
        case 'surname':
            if ( validate(el,5,error_id )) {
                    customer_surname = el.value;
                    validated.sname = true;
                } else {
                    customer_surname = '';
                    validated.sname = false;
                }
                document.getElementById('complete_btn').disabled = !showBtn();
            break;
        case 'street':
            if ( validate(el,5,error_id,false) ) {
                        customer_street = el.value;
                        validated.street = true;
                    } else {
                        customer_street = '';
                        validated.street = false;
                    }
                    document.getElementById('complete_btn').disabled = !showBtn();
            break;
        case 'house':
                if ( validateNumbers(el,error_id) ) {
                    customer_house = el.value;
                            validated.house = true;
                        } else {
                            customer_house = '';
                            validated.house = false;
                        }
                        document.getElementById('complete_btn').disabled = !showBtn();
            break;
        case 'flat':
                if ( validateNumbers(el,error_id,true) ) {
                    customer_flat = el.value;
                    validated.flat = true;
                } else {
                    customer_flat = '';
                    validated.flat = false;
                }
                document.getElementById('complete_btn').disabled = !showBtn();
            break;
        case 'delivery':
                const today = new Date();
                const selectedDate = new Date(el.value);
                validated.ddate = validateDate(today,selectedDate, error_id);
                document.getElementById('complete_btn').disabled = !showBtn();
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
        err.innerHTML = 'empty';
        return false;
    } else if (checkSize(el,size)) {
        err.style.display = 'block';
        if(!checkString(el) && stringCheck) {
            err.innerHTML = `only string, not less then ${size}`;
        } else {
            err.innerHTML = `not less then ${size}`;
        }
    } else if (!checkString(el) && stringCheck) {
        err.style.display = 'block';
        err.innerHTML = 'only string';
        return false;
    } else {
        err.style.display = 'none';
        return true;
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
        err.innerHTML = 'from next day';
        return false;
    } else {
        err.style.display = 'none';
        return true;
    }
}

function validateNumbers(el,error_id, dashes=false) {
    var err = document.getElementById(error_id);
    if (dashes) {
        if (checkEmpty(el)) {
            err.style.display = 'block';
            err.innerHTML = 'empty';
            return false;
        } else  if ( !checkPosNumbersWithDashes(el) ) {
            err.style.display = 'block';
            err.innerHTML = 'only positive';
            return false;
        } else {
            err.style.display = 'none';
            
            return true;
        }
    } else {
        if (checkEmpty(el)) {
            err.style.display = 'block';
            err.innerHTML = 'empty';
            return false;
        } else  if ( !checkPosNumbers(el) ) {
            err.style.display = 'block';
            err.innerHTML = 'only positive';
            return false;
        } else {
            err.style.display = 'none';
            return true;
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
    if ( checkedCounter == checkedLenhtg) {
        err.style.display = 'none';
        validated.gift = true;
    } else {
        err.style.display = 'block';
        err.innerHTML = 'you must choose only 2 gift';
        validated.gift = false;
    }
    document.getElementById('complete_btn').disabled = !showBtn();
}

function validateRadio(id) {
    var radio_btn = document.getElementById(id);
    validated.ptype = radio_btn.checked;
    console.warn(validated)
    document.getElementById('complete_btn').disabled = !showBtn();
}

function showBtn() {
    return   validated.name &&
             validated.sname &&
             validated.ddate &&
             validated.flat &&
             validated.gift &&
             validated.house &&
             validated.ptype &&
             validated.street;
}

function complete() {
   var infoBlock = document.getElementById('info');
   var contentBlock = document.getElementById('cont');
   var completeButton = document.getElementById('complete_btn');
   infoBlock.getElementsByTagName('h1')[0].innerHTML = 'Order Completed';
   infoBlock.getElementsByTagName('p')[0].innerHTML = `The order created. The delivery address is ${customer_street} street house ${customer_house} flat ${customer_flat}. Customer ${customer_name} ${customer_surname}`;
   completeButton.style.display = 'none';
    infoBlock.classList.add('flex');
    contentBlock.style.display = 'none';
}



