<div id="registrationForm">
    <form style="padding-left: 10px;" class="mb-4" aria-describedby="athleteFormHelp">
        <h6 class="heading mr-2" style="font-size: 1rem"><strong>1</strong> - Participant Information</h6>
        <div id="athleteFormsContainer">
            <?php
            $data = array("athleteNumber" => "1");
            echo fillTemplate("$webroot/training/athleteFormTemplate.php", $data);
            //Template will be used by front JS to add other athelte forms.
            echo file_get_contents("$webroot/training/athleteFormTemplate.php");
            ?>
        </div>
        <button id="addAthleteBtn" class="btn btn-outline-primary btn-sm" type="button"></span>Add Athlete</button>
        <small id="emailHelp" class="form-text text-muted">You may add as many atheltes as you wish.</small>
        <h6 class="heading mr-2 mt-4" style="font-size: 1rem"><strong>2</strong> - Guardian Information</h6>
        <div id="guardianFormContainer">
            <?php echo file_get_contents("$webroot/training/guardianForm.php"); ?>
        </div>
    </form>
    <div class="d-flex session-button-container">
        <div class="ml-auto mr-auto">
            <button data-id="5" class="btn btn-dark btn-accent" style="min-width: 250px;" disabled>Add To Cart</button>
            <div id="storeCreationLoading" class="angel-linear-loading">
                <div class="line"></div>
                <div class="subline inc"></div>
                <div class="subline dec"></div>
            </div>
        </div>
    </div>
</div>