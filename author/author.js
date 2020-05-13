const authorTempalte = async () => {

    //  Get specific author id using urlParams
    const urlParams = new URLSearchParams(window.location.search);
    const authorId = urlParams.get('id');
    const selectedTagSlug = urlParams.get('tag');

    //  Get the needed data
    const author = await getAuthorById(authorId);
    const authorArticles = await getArticleByAuthorId(authorId);
    const tags = await getTags();

    //  Get HTML templates
    const articleCard = await articleCardFn();
    const paginationBar = await paginationBarFn();
    

    // //  Gets the articles written by the specific author
    // let authorArticles = articles.filter(article => article.authorId === authorId);

    //  Gets all tags used in the articles written by the specific author
    const authorTags = authorArticles.map(obj => obj.tags);
    let selectedTagName = 'All Tags';
    if (tags[selectedTagSlug]) {
        selectedTagName = tags[selectedTagSlug];    
        authorArticles = authorArticles.filter(article => article.tags.includes(selectedTagSlug))   
    } 
    let uniqueAuthorTags = [...new Set(authorTags.flat())].map(slug => {
        return {
            slug: slug,
            tagName: tags[slug]
        }
    });

    //  Makes difault sorting on author articles by newest
    sortBy(authorArticles, 'date', 'asc');

    const authorTpl = `
    {{ #author }}
    <main>
        <div class="bg-secondary pt-5 pb-4">
            <div class="container">
                <div class="float-left pr-4">
                    <img class="rounded-circle border border-warning img-border" src="{{ avatar }}">
                </div>
                <h1 class="text-light mt-0">{{ name }}</h1>
                <a class="text-warning text-decoration-none" href="./?id={{ id }}">
                <h6>@{{ username }}</h6>
                </a>
                <a class="text-light text-decoration-none" href="mailto: {{ email }}"><i
                    class="fa fa-envelope pr-2"></i>{{ email }}</a>
                <br>
                <a class="text-light text-decoration-none" href="{{ website }}"><i
                    class="fa fa-globe pr-2"></i> {{ website }}</a>
                <p class="m-bio">"{{ bio }}"</p>
            </div>
        </div>
        <div class="bg-warning">
            <div class="container">
                <div class="pt-4 pb-4">

                    <div class="float-right btn-group">
                        <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split text-warning" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="pr-2" id="current-sorting">Date (newest)</span>
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item sort-by-drop-down date-n">Date (newest)</a>
                            <a class="dropdown-item sort-by-drop-down date-o">Date (oldest)</a>
                            <a class="dropdown-item sort-by-drop-down comm-m">Most commented</a>
                            <a class="dropdown-item sort-by-drop-down comm-l">Least commented</a>
                        </div>
                    </div>

                    <div class="float-right btn-group mr-2">
                        <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split text-warning" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="pr-2">{{ selectedTagName }}</span>
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="./?id={{ id }}">All Tags</a>
                            {{ #tags }}
                                <a class="dropdown-item" href="./?id={{ id }}&tag={{ slug }}">{{ tagName }}</a>
                            {{ /tags }}
                        </div>
                    </div>
                    
                    <div class="float-right btn-group mr-2">
                        <button type="button" class="btn btn-secondary text-warning">Articles per page</button>
                        <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split text-warning" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            <span class="sr-only">Toggle Dropdown</span>
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="./?id={{ id }}" value="3">3</a>
                            <a class="dropdown-item" href="./?id={{ id }}" value="5">5</a>
                            <a class="dropdown-item" href="./?id={{ id }}" value="7">7</a>
                        </div>
                    </div>

                    <h2 class="text-dark mb-0"><b>{{ name }} articles</b></h2>
                </div>
            </div>
        </div>

        ${articleCard}

        ${paginationBar}

    </main>
    {{ /author }}
`

    //  Pagination variables
    let currentPage = 0;
    const ITEMS_PER_PAGE = 3;
    const TOTAL_PAGES = Math.ceil(authorArticles.length / ITEMS_PER_PAGE);

    //  Render author page template
    const updateHTML = () => {
        document.getElementById('author').innerHTML = Mustache.render(authorTpl, {
            author: author,
            authorArticles: authorArticles.slice(currentPage * ITEMS_PER_PAGE, ITEMS_PER_PAGE * (currentPage + 1)),
            selectedTagName: selectedTagName,
            tags: uniqueAuthorTags,
            pages: getPages(TOTAL_PAGES, currentPage),
            previousNext: paginationNvg(TOTAL_PAGES, currentPage)
        })
    }
    updateHTML()

    //  Adding event listeners to the authorTpl
    const authorMain = document.getElementById('author');
    authorMain.addEventListener('click', (event) => {

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
                currentPage = 0;
                sortBy(authorArticles, 'date', 'asc');
                
            } else if (event.target.matches(".date-o")) {
                currentPage = 0;
                sortBy(authorArticles, 'date', 'desc');

            } else if (event.target.matches(".comm-m")) {
                currentPage = 0;
                sortBy(authorArticles, 'commentsLength', 'asc');

            } else if (event.target.matches(".comm-l")) {
                currentPage = 0;
                sortBy(authorArticles, 'commentsLength', 'desc');
            }
            updateHTML()
            document.getElementById('current-sorting').innerHTML = currentSorting;
        }
    });
}

authorTempalte()