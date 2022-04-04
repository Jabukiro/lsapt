<form class="card">
    <div class="card-body">
        <div class="form-group">
            <label for="guardianName">Full Name*:</label>
            <input required type="text" class="form-control" id="guardianName" placeholder="Guardian's Name">
        </div>
        <div class="invalid-feedback">
            Full Name is required
        </div>
        <div class="form-group">
            <label for="guardianAddress">Address:</label>
            <input required type="text" class="form-control" id="guardianAddress" placeholder="35B, Maroog Way, Nollamara">
        </div>
        <div class="form-group">
            <label for="guardianEmail">Email*:</label>
            <input required type="text" class="form-control" id="guardianEmail" placeholder="Email">
            <div class="invalid-feedback">
                Please fill in the email so that we can communicate with you
            </div>
        </div>
        <div class="form-group">
            <label for="guardianNumber">Contact Number*:</label>
            <input required type="text" class="form-control" id="guardianNumber" placeholder="Contact Number">
            <div class="invalid-feedback">
                Phone number is important so that we can quickly contact you in the event of an emergency
            </div>
        </div>
        <div class="form-group">
            <label for="guardianName">Alternate Contact Name*:</label>
            <input required type="text" class="form-control" id="alternateName" placeholder="Name">
            <div class="invalid-feedback">
                These details will help us in case the first guardian is not available
            </div>
        </div>
        <div class="form-group">
            <label for="guardianNumber">Alternate Contact Number*:</label>
            <input required type="text" class="form-control" id="alternateNumber" placeholder="Contact Number">
        </div>
        <div class="invalid-feedback">
            These details will help us in case the first guardian is not available
        </div>
    </div>
</form>