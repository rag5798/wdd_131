function isCardNumberValid(number) {
	// normally we would contact a credit card service...but we don't know how to do that yet. So to keep things simple we will only accept one number
	return number === '1234123412341234'
}
function isNameValid(string){
    return string === 'ROBERTGOETTMAN'
}
function isExperationValid(date){
    return 
}
function displayError(msg) {
	// display error message
	document.querySelector('.errorMsg').innerHTML = msg
}
function submitHandler(event) {
	event.preventDefault()
	let errorMsg = ''
	console.log(this.numInput.value.replace(/\s+/g, ''))
    console.log(this.cardHolderInput.value.replace(/\s+/g, '').toUpperCase())
    console.log(this.month.value)
    console.log(this.year.value)
    let current = new Date()
    let date = new Date(1, 1)
	// clear any previous errors
	displayError('')
	// check credit card number
	if (isNaN(this.numInput.value.replace(/\s+/g, ''))) {
		// it is not a valid number
		errorMsg += 'Card number is not a valid number<br>'
	} else if (!isCardNumberValid(this.numInput.value.replace(/\s+/g, ''))) {
		// it is a number, but is it valid?
		errorMsg += 'Card number is not a valid card number<br>'
	}
    if (!isNameValid(this.cardHolderInput.value.replace(/\s+/g, '').toUpperCase())){
        errorMsg += 'Card Holder is not a valid card holder<br>'
    }
    if (this.month.value > 12 || this.month.value === '' || this.month.value < 1 || isNaN(this.year.value)){
        errorMsg += 'Date Provided is not valid<br>'
    }else{
        date = new Date(2000+parseInt(this.year.value), this.month.value-1)
        console.log(date)
    }
    if (date < current && !errorMsg.includes('Date Provided is not valid<br>')){
        errorMsg += 'Date Provided is not valid<br>'
    }
	if (errorMsg !== '') {
		// there was an error. stop the form and display the errors.
		displayError(errorMsg)
		return false
	}
	return true
}

document.querySelector('#credit-card').addEventListener('submit', submitHandler)