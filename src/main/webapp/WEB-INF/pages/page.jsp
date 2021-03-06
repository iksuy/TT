<!doctype html>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="/static/bootstrap/css/bootstrap.min.css" type="text/css" rel="stylesheet">
    <link href="/static/jquery-validation-engine/css/validationEngine.jquery.css" type="text/css" rel="stylesheet">
    <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>

<script src="https://code.jquery.com/jquery.js"></script>
<script src="/static/bootstrap/js/bootstrap.min.js"></script>
<script src="http://www.jsviews.com/download/jsviews.js"></script>
<script src="/static/js/backbone-app/lib/underscore-min.js"></script>
<script src="/static/js/backbone-app/lib/backbone-min.js"></script>
<script src="/static/jquery-validation-engine/js/languages/jquery.validationEngine-en.js" type="text/javascript"></script>
<script src="/static/jquery-validation-engine/js/jquery.validationEngine.js" type="text/javascript"></script>
<script src="/static/js/backbone-app/lib/jsrender-range.js"></script>

<div class="navbar">
    <h3>
        <div class="col-lg-offset-5 text-primary" id="navbardiv">
            <div class="col-sm-3" id="usernamediv">Hello, sign in please</div>
        </div>
    </h3>
</div>

<div class="container">
    <div class="row">
        <div id="content" class="col-md-12>">

        </div>
    </div>
</div>

<script src="static/js/backbone-app/models/models.js"></script>
<script src="static/js/backbone-app/views/PaginationView.js"></script>
<script src="static/js/backbone-app/views/LogoutView.js"></script>
<script src="static/js/backbone-app/views/TransactionsView.js"></script>
<script src="static/js/backbone-app/views/LoginView.js"></script>
<script src="static/js/backbone-app/views/AccountsView.js"></script>
<script src="static/js/backbone-app/views/AccountDetailsView.js"></script>
<script src="static/js/backbone-app/main-backbone-app.js"></script>
<script src="static/js/backbone-app/my-jquery-validation.js"></script>

</body>
</html>