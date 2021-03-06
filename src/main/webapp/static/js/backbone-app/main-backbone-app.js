const PAGES_FOR_VIEW = 7;
const ROWS_PER_PAGE = 10;

window.templateLoader = {

    load: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (window[view]) {
                deferreds.push($.get('static/views/' + view + '.html', function(data) {
                    window[view].prototype.template = _.template(data);
                }, 'html'));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    }

};

templateLoader.load(["LoginView", "AccountsView", "TransactionsView", "LogoutView", "PaginationView", "AccountDetailsView"],
    function () {
        app = new Router();
        Backbone.history.start();
    });

var loginStatus;

window.Router = Backbone.Router.extend({

    routes: {
        "": "login",
        "accounts": "accounts",
        "accounts/page/:pageNumber": "accounts",
        "transactions": "transactions",
        "transactions/page/:pageNumber":"transactions"
    },

    initialize: function () {

    },

    login: function() {
        var self = this;
        loginStatus = new LoginStatusModel();
        loginStatus.fetch({
            success: function(){
                console.log(loginStatus.attributes.loggedIn);
                if(loginStatus.attributes.loggedIn){
                    switch (loginStatus.attributes.role){
                        case 'Client':
                                        self.navigate("#transactions", {trigger: true});
                                        return;
                                        break;
                        case 'Employee': self.navigate("#accounts", {trigger: true});
                                        return;
                                        break;
                    }
                } else {
                    self.loginView = new LoginView();
                    self.loginView.render();
                    $('#content').html(self.loginView.el);
                    console.log("hmmm...");
                }
            },
            error: function(){
                console.log("error fetch");
            }
        });
    },

    accounts: function (page) {
        var self = this;
        if(!page){
            page = 1;
        }
        var pages = new PaginationInfoModel({url:"rest/userslist/pagination"});
        pages.set({pagesForView:PAGES_FOR_VIEW,rowsPerPage:ROWS_PER_PAGE});
        pages.fetch({
            data:{
                pagesForView:pages.attributes.pagesForView,
                rowsPerPage:pages.attributes.rowsPerPage
            },
            success: function(){
                if(!isValidPage(self, page, pages)){
                    page = pages.attributes.activePage;
                    self.navigate("#accounts/page/" + page, {trigger: true});
                }

                pages.attributes.activePage = page;
                pages.save();

                loginStatus = new LoginStatusModel();
                loginStatus.fetch();

                if(!self.accountList){
                    self.accountList = new AccountList();
                }

                self.accountList.fetch({
                    data: $.param({page: page}),
                    success: function(){
                        accountsSuccessFetch(self, pages)
                    },
                    error: function(err, xhr){
                        errorFetch(xhr, self);
                    }
                });

            },
            error: function(err, xhr, status){
                errorFetch(xhr, self);
            }});

    },

    transactions: function (page) {
        var self = this;
        if(!page){
            page = 1;
        }
        var pages = new PaginationInfoModel({url:"rest/transaction/pagination"});
        pages.set({pagesForView:PAGES_FOR_VIEW,rowsPerPage:ROWS_PER_PAGE});
        pages.fetch({
            data: {
                pagesForView:pages.attributes.pagesForView,
                rowsPerPage:pages.attributes.rowsPerPage
            },
            success: function(){
                if(!isValidPage(self, page, pages)){
                    page = pages.attributes.activePage;
                    self.navigate("#transactions/page/" + page, {trigger: true});
                }

                pages.attributes.activePage = page;
                pages.save();

                loginStatus = new LoginStatusModel();
                loginStatus.fetch();

                if(!self.userTransactions){
                    self.userTransactions = new TransactionList();
                }

                self.userTransactions.fetch({
                    data: $.param({ page: page}),
                    success: function(data){
                        transactionsSuccessFetch(self, pages)
                    },
                    error: function(err, xhr){
                        errorFetch(xhr, self);
                    }
                });

            },
            error: function(err, xhr, status){
                errorFetch(xhr, self);
            }});
    }
});


function successFetchInit(pages){
    if(!self.logoutView){
        self.logoutView = new LogoutView();
    } else if($("#logoutForm").length == 0){
        self.logoutView.render();
    }
    if(!this.paginationView){
        this.paginationView = new PaginationView({paginationParams:pages});
    } else {
        this.paginationView.paginationParams = pages;
    }
    this.paginationView.render();
    this.paginationView.paginationParams.set({activePage:pages.attributes.activePage});
}

function transactionsSuccessFetch(self, pages){
    successFetchInit(pages)
    self.transactionsView = new TransactionsView({collection:self.userTransactions,pagination:this.paginationView});
    self.transactionsView.render();
    $('#content').html(self.transactionsView.el);
}

function accountsSuccessFetch(self, pages){
    successFetchInit(pages);
    self.accountsView = new AccountsView({collection:self.accountList,pagination:this.paginationView});
    self.accountsView.render();
    $('#content').html(self.accountsView.el);
}

function errorFetch(xhr, self){
    console.log("error");
    self.navigate("", {trigger: true});
}

function isValidPage(self, page, pages){
    return page <= pages.attributes.pagesCount && page >= 1;
}