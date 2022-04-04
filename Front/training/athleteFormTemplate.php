<!-- 
    Serves as a template so that multiple of the forms can be on the same page
    athleteNumber will serve as an ID to differentiate the forms 
    View /module/fillTemplate.php for how the template is populated
    JS Registration form depends on this element structuring to extract information.
    Didn't want to use a whole-ass framework for a relative small job.
        Using IDs felt potentially slow and not scalable.
-->
<form class="accordion mb-3" style="display: none; max-width: 500-px" id="accordionAthlete{{athleteNumber}}">
    <div class="card">
        <div class="card-header p-0 d-flex" id="accordionHeading{{athleteNumber}}">
            <button id="accordionHeaderAthlete{{athleteNumber}}" class="btn btn-dark btn-accent text-left" style="color: var(--main-color); flex-grow: 2; overflow: hidden; text-overflow:ellipsis" type="button" data-toggle="collapse" data-target="#collapse{{athleteNumber}}" aria-expanded="true" aria-controls="collapse{{athleteNumber}}">
                Athlete - {{athleteNumber}}
            </button>
            <button class="btn btn-light" style="color: var(--main-color)" type="button" onclick="document.getElementById('accordionAthlete{{athleteNumber}}').remove();">
                <span>&times;</span>
            </button>
        </div>
        <div id="collapse{{athleteNumber}}" class="collapse" aria-labelledby="accordionHeading{{athleteNumber}}" data-parent="#accordionAthlete{{athleteNumber}}">
            <div class="card-body">
                <div class="form-group">
                    <label for="athleteName{{athleteNumber}}">Full Name*:</label>
                    <input required type="text" class="form-control" id="athleteName{{athleteNumber}}" placeholder="Athlete's Name">
                    <div class="invalid-feedback">
                        Full Name is required
                    </div>
                </div>
                <div class="form-group">
                    <label for="athleteGender">Gender*:</label>
                    <select required class="custom-select" id="atheleteGender{{athleteNumber}}" name="atheleteGender">
                        <option selected value="FEMALE">Female</option>
                        <option value="MALE">Male</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="athleteDOB{{athleteNumber}}">Date of Birth*:</label>
                    <input required type="date" class="form-control" id="athleteDOB{{athleteNumber}}" name="athleteDOB" placeholder="Athlete's DoB">
                    <div class="invalid-feedback">
                        Date of birth is required
                    </div>
                </div>
                <div class="form-group">
                    <label for="athleteSchool{{athleteNumber}}">School*:</label>
                    <input required type="text" class="form-control" id="athleteSchool{{athleteNumber}" aria-describedby="" placeholder="Athlete's School">
                    <div class="invalid-feedback">
                        School Name is required
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>