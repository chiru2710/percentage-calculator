// pc.js
const calculationTypeRadioGroup = document.getElementById('calculationTypeRadioGroup');
const scoredMarksEditText = document.getElementById('scoredMarksEditText');
const totalMarksEditText = document.getElementById('totalMarksEditText');
const clearButton = document.getElementById('clearButton');
const calculateButton = document.getElementById('calculateButton');
const resultTextView = document.getElementById('resultTextView');

calculationTypeRadioGroup.addEventListener('change', updateInputFields);
calculateButton.addEventListener('click', calculatePercentage);
clearButton.addEventListener('click', clearFields);

function calculatePercentage() {
    const selectedType = document.querySelector('input[name="calculationType"]:checked').value;
    const scoredMarks = parseFloat(scoredMarksEditText.value);

    if (isNaN(scoredMarks)) {
        resultTextView.textContent = "Invalid input (Scored Marks must be a number)";
        return;
    }

    if (selectedType === 'marks') {
        const totalMarks = parseFloat(totalMarksEditText.value);
        if (isNaN(totalMarks) || totalMarks <= 0 || scoredMarks < 0 || scoredMarks > totalMarks) {
            resultTextView.textContent = "Invalid input (Total Marks must be positive and >= Scored Marks)";
            return;
        }
        const percentage = (scoredMarks / totalMarks) * 100;
        resultTextView.textContent = `Percentage: ${percentage.toFixed(2)}%`;
    } else if (selectedType === 'cgpa' || selectedType === 'sgpa') {
        if (scoredMarks < 0 || scoredMarks > 10) {
            resultTextView.textContent = "Invalid input (CGPA/SGPA must be between 0 and 10)";
            return;
        }
        const percentage = scoredMarks * 9.5;
        resultTextView.textContent = `Percentage: ${percentage.toFixed(2)}%`;
    }
}

function updateInputFields() {
    const selectedType = document.querySelector('input[name="calculationType"]:checked').value;

    if (selectedType === 'marks') {
        totalMarksEditText.style.display = 'block';
        scoredMarksEditText.placeholder = "Scored Marks";
        totalMarksEditText.placeholder = "Total Marks";
    } else if (selectedType === 'cgpa') {
        totalMarksEditText.style.display = 'none';
        scoredMarksEditText.placeholder = "CGPA";
    } else if (selectedType === 'sgpa') {
        totalMarksEditText.style.display = 'none';
        scoredMarksEditText.placeholder = "SGPA";
    }
}

function clearFields() {
    scoredMarksEditText.value = "";
    totalMarksEditText.value = "";
    resultTextView.textContent = "";
    updateInputFields();
}

updateInputFields();