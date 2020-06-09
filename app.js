const loanForm = document.querySelector('#loan-form').addEventListener('submit', function(e){
    document.querySelector('#loading').style.display = 'block';
    document.querySelector('#results').style.display = 'none';
    setTimeout(calculateResults,2000);
    e.preventDefault();

})

//create method to calculate results
function calculateResults(e){
    const loanAmnt = document.getElementById('amount');
    const interestRate = document.getElementById('interest');
    const yrsToRepay = document.getElementById('years');
    const toPayMonthly = document.getElementById('monthly-payment');
    const totalToPay = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    
        const principle = parseFloat(loanAmnt.value);
       
        //create the monthly interest then find formula then parse
        const monthlyInterest = (parseFloat(interestRate.value)/100)/12;

        //calculate the amount of the payments
        const totalMonths = parseFloat(yrsToRepay.value)*12;
        
        //formulae for final amount to be paid monthly
        const formula = Math.pow(1+monthlyInterest,totalMonths);
        const finale = (principle*formula*monthlyInterest)/(formula-1);

        //PREVENTIVE ERROR HANDLING 
        if(isFinite(finale)){

            toPayMonthly.value=finale.toFixed(2);
            totalToPay.value=(finale*totalMonths).toFixed(2);
            totalInterest.value = ((finale*totalMonths)-principle).toFixed(2);

            //IF WORKS 
            document.querySelector('#results').style.display = 'block';
            document.querySelector('#loading').style.display = 'none';
        }
        else{
            showError('Please check your values')
        }

        
       
}

function showError(text){
    //HIDE THE RESULTS AND THE LOADING
    document.querySelector('#results').style.display = 'none';
    document.querySelector('#loading').style.display = 'none';

    //CREATE AN ALERT STYLE DIV AND INSERT IT ABOVE THE HEADING
    const div = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    div.className='alert alert-danger';
    const error = document.createTextNode(text);
    div.appendChild(error);
    card.insertBefore(div,heading)

    //REMOVES ERROR AFTER 3 SECONDS
    setTimeout(clearError,3000)
}

//FUNCTION TO REMOVE THE ERROR 
function clearError(){
    document.querySelector('.alert').remove()
}
