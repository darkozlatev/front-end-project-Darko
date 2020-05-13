const articleTemplate = async () => {

    //  Get specific article id using urlParams
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    const article = await getArticleById(articleId);
    const author = await getAuthorById(article.authorId);
    const articleComments = await getCommentsByArticleId(articleId);
    
    //  Makes difault sorting on article comments by oldest
    sortBy(articleComments, "date", "desc");

    const articleTpl = `
    <main>
        <div class="bg-secondary pt-5 pb-5">
            <div class="container">
                {{ #author }}
                    <div class="media">
                        <div class="float-left pr-4">
                            <a class="text-warning text-decoration-none" href="../author/?id={{ id }}">
                                <img class="rounded-circle border border-warning img-border" src="{{ avatar }}">
                            </a>
                        </div>
                        <div class="media-body">
                            <h6 class="text-light mb-0">An article by:
                                <a class="text-warning text-decoration-none" href="../author/?id={{ id }}">
                                    <h3>{{ name }}</h3>
                                </a>
                            </h6>
                            <a class="text-warning text-decoration-none" href="../author/?id={{ id }}">
                                <h5>@{{ username }}</h5>
                            </a>
                            <a class="text-light text-decoration-none" href="mailto: {{ email }}"><i
                                class="fa fa-envelope pr-2"></i>{{ email }}</a>
                            <br>
                            <a class="text-light text-decoration-none" href="{{ website }}"><i
                                class="fa fa-globe pr-2"></i> {{ website }}</a>
                        </div>
                    </div>
                {{ /author }}
            </div>
        </div>

        {{ #article }}    
            <div class="bg-warning pb-3 pt-3">
                <div class="container">
                    <a class="text-secondary text-decoration-none" href="../article/?id={{ id }}">
                        <h2>{{ title }}</h2>
                    </a>
                    <p class="text-light mt-2 mb-0">{{ date }}</p>
                    {{ #tags }}
                        <a class="text-secondary text-decoration-none pr-2" href="../tag/?tag={{ . }}"><b>{{ . }}</b></a>
                    {{ /tags }}
                </div>
            </div>

            <div class="container">
                <p class="article-content">{{{ body }}}</p>
            </div>

            <div class="bg-warning">
                <div class="container">
                    <div class="pt-4 pb-4">
                        <div class="float-right btn-group">
                            <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split text-warning" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <span class="pr-2" id="current-sorting">Date (oldest)</span>
                            </button>
                            <div class="dropdown-menu">
                                <a class="dropdown-item sort-by-drop-down date-o">Date (oldest)</a>
                                <a class="dropdown-item sort-by-drop-down date-n">Date (newest)</a>
                            </div>
                        </div>
                        <h2 class="text-dark mb-0"><b>Article comments</b></h2>
                    </div>
                </div>
            </div>
        {{ /article }}

        <div id="comments-anchor" class="container">
            {{ #comments }}
                <div class="media comment-card">
                    {{ #authorComments }}
                        <div class="float-left pr-4">
                            <a class="text-warning text-decoration-none" href="../author/?id={{ userId }}">
                                <img class="rounded-circle border border-warning img-border img-size" src="{{ avatar }}">
                        </div>
                    {{ /authorComments }}   
                    {{ ^authorComments }}
                        <div class="float-left pr-4">
                            <a class="text-warning text-decoration-none" href="../author/?id={{ userId }}">
                                <img class="rounded-circle border border-warning img-border img-size" src="https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png"></a>
                        </div>
                    {{ /authorComments }}
                    <div class="media-body">
                        {{ #authorComments }}
                            <h5 class="mb-0">{{ name }}</h5></a>
                        {{ /authorComments }} 
                        {{ ^authorComments }}
                            <h5 class="mb-0">Anonymous</h5>
                        {{ /authorComments }}  
                        <p class="mb-3">{{ date }}</p>
                        <p class="mb-0">{{{ body }}}</p>       
                    </div>
                </div>
            {{ /comments }}
        </div>
        

        <div class="container">
            <nav aria-label="users-pagination">
                <ul class="pagination justify-content-center mt-4">
                    {{ #previousNext }}
                        <li class="page-item {{ enableDisablePrev }}">
                            <a class="page-link prev-next" prev-next="minus" href="#" tabindex="-1" aria-disabled="true"><<</a>
                        </li>
                        {{ #pages }}
                            <li class="page-item {{ activeClass }}">
                                <a class="page-link page-number" data-page={{ dataPage }} href="#">{{ label }}</a>
                            </li>
                        {{ /pages }}
                        <li class="page-item {{ enableDisableNext }}">
                            <a class="page-link prev-next" prev-next="plus" href="#">>></a>
                        </li>
                    {{ /previousNext }}
                </ul>
            </nav>
        </div>
    </main>
    
`

    //  Pagination variables
    let currentPage = 0;
    const ITEMS_PER_PAGE = 3;
    const TOTAL_PAGES = Math.ceil(articleComments.length / ITEMS_PER_PAGE);

    //  Render article page template
    const updateHTML = () => {
        document.getElementById('article').innerHTML = Mustache.render(articleTpl, {
            author: author,
            article: article,
            comments: articleComments.slice(currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE * (currentPage + 1)),
            pages: getPages(TOTAL_PAGES, currentPage),
            previousNext: paginationNvg(TOTAL_PAGES, currentPage)
        });
    }
    updateHTML();

    //  Adding event listeners to the articleTpl
    const articleMain = document.getElementById('article');
    articleMain.addEventListener('click', (event) => {

        if (event.target.matches("a.prev-next")) {
            if (event.target.getAttribute('prev-next') === 'minus') {
                currentPage--;
                updateHTML()

            } else {
                currentPage++;
                updateHTML()
            }
            
        } else if (event.target.matches("a.page-number")) {
            currentPage = event.target.getAttribute('data-page') * 1;
            updateHTML();

        } else if (event.target.matches(".sort-by-drop-down")) {
            document.getElementById('current-sorting').innerHTML;
            event.preventDefault();
            
            if (event.target.matches(".date-n")) {
                currentPage = 0
                sortBy(articleComments, "date", "asc");

            } else if (event.target.matches(".date-o")) {
                currentPage = 0
                sortBy(articleComments, "date", "desc");

            }
            updateHTML();
        }
    });
}

articleTemplate();