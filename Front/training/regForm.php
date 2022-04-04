<!--Form structure is relied upon by JS registration form-->
<div id="registrationForm">
    <div style="padding-left: 10px;" class="mb-4" aria-describedby="athleteFormHelp">
        <h6 class="heading mr-2" style="font-size: 1rem"><strong>1</strong> - Participant Information</h6>
        <div id="athleteFormsContainer">
            <?php
            //Template will be used by front JS to add other athelte forms.
            echo file_get_contents("$webroot/training/athleteFormTemplate.php");
            ?>
        </div>
        <button id="addAthleteBtn" class="btn btn-outline-primary btn-sm" type="button">Add Athlete</button>
        <small id="emailHelp" class="form-text text-muted">You may add as many atheltes as you wish. At least one is required.</small>
        <h6 class="heading mr-2 mt-4" style="font-size: 1rem"><strong>2</strong> - Guardian Information</h6>
        <div id="guardianFormContainer">
            <?php echo file_get_contents("$webroot/training/guardianForm.php"); ?>
        </div>
    </div>
    <div class="d-flex session-button-container">
        <div class="ml-auto mr-auto">
            <button data-id="5" class="btn btn-dark btn-accent" style="min-width: 250px;">Add To Cart</button>
            <div id="storeCreationLoading" class="angel-linear-loading">
                <div class="line"></div>
                <div class="subline inc"></div>
                <div class="subline dec"></div>
            </div>
        </div>
    </div>
    <div id="noAthleteFeedback" class="text-center invalid-feedback" style="display: none;">
        Please add at least one athlete above
    </div>
    <div id="formsNotValid" class="text-center invalid-feedback" style="display: none;">
        Please enter all the required information above before proceeding
    </div>
</div>