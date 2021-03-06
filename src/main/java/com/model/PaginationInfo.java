package com.model;

public class PaginationInfo {

    private Integer pagesCount;

    private Integer pagesForView;

    private Integer activePage;

    private Integer rowsPerPage;

    private String url;

    public PaginationInfo() {
    }

    public PaginationInfo(Integer pagesCount, Integer activePage, Integer pagesForView, Integer rowsPerPage, String url) {
        this.pagesCount = pagesCount;
        this.activePage = activePage;
        this.pagesForView = pagesForView;
        this.rowsPerPage = rowsPerPage;
        this.url = url;
    }

    public Integer getPagesCount() {
        return pagesCount;
    }

    public void setPagesCount(Integer pagesCount) {
        this.pagesCount = pagesCount;
    }

    public Integer getPagesForView() {
        return pagesForView;
    }

    public void setPagesForView(Integer pagesForView) {
        this.pagesForView = pagesForView;
    }

    public Integer getActivePage() {
        return activePage;
    }

    public void setActivePage(Integer activePage) {
        this.activePage = activePage;
    }

    public Integer getRowsPerPage() {
        return rowsPerPage;
    }

    public void setRowsPerPage(Integer rowsPerPage) {
        this.rowsPerPage = rowsPerPage;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

}
