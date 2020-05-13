const authorsTempalte = async () => {
  const authors = await getAuthors();

  //  Makes difault sorting on authors page by alphabetical order (A - Z)
  sortBy(authors, "name", "a-z");

  const authorsTpl = `
  
  	<div class="bg-warning">
        <div class="container">
                <div class="pt-4 pb-4">
                  <div class="float-right btn-group">
                    <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split text-warning" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      	<span class="pr-2" id="current-sorting">A-Z</span>
                    </button>
                    <div class="dropdown-menu">
						<a class="dropdown-item a-z">A-Z</a>
						<a class="dropdown-item z-a">Z-A</a>
						<a class="dropdown-item comm-m">Most Articles</a>
						<a class="dropdown-item comm-l">Least Articles</a>
                    </div>
                  </div>                    
                  <h2 class="text-dark mb-0"><b>Authors</b></h2>
                </div>
            </div>
		</div>
		
      	{{#authors}}
        <main>
          	<div class="container">
				<div class="row">
					<div class="card border border-dark mt-4 col-12">
						<div class="card-body">
							<div class='float-left pr-4'>
								<a class="text-dark" href="../author/?id={{ id }}">
									<img class="rounded-circle border border-warning img-border mt-3" src="{{ avatar }}">
								</a>
							</div>
							<h6 class="card-subtitle mt-3 text-muted">Author:</h6>
							<a class="text-warning text-decoration-none" href="../author/?id={{ id }}">
								<h4>{{ name }}</h4>
							</a>
							<a class="text-warning text-decoration-none" href="../author/?id={{ id }}">
								<h5>@{{ username }}</h5>
							</a>
							<a class="text-secondary text-decoration-none" href="mailto: {{ email }}">
								<i class="fa fa-envelope pr-2"></i>{{ email }}
							</a>
							<br>
							<a class="text-secondary text-decoration-none" href="{{ website }}">
							<i class="fa fa-globe pr-2"></i> {{ website }}
							</a>
							<p class="text-muted m-bio mt-4">"{{ bio }}"</p>
							<a href="../author/?id={{ id }}" class="float-right btn btn-warning">
								Articles: <b>{{ articlesCount }}</b>
							</a>
						</div>
					</div>
				</div>
          	</div>
        </main>
      	{{/authors}}
    
      <div class="container">
            <nav aria-label="users-pagination">
                <ul class="pagination justify-content-center mt-4">
                    {{ #previousNext }}
                        <li class="page-item {{ enableDisablePrev }}">
                            <a class="page-link prev-next" prev-next="minus" href="#" tabindex="-1" aria-disabled="true"><<</a>
                        </li>
                        {{#pages}}
                            <li class="page-item {{ activeClass }}">
                                <a class="page-link page-number" data-page={{ dataPage }} href="#">{{ label }}</a>
                            </li>
                        {{/pages}}
                        <li class="page-item {{ enableDisableNext }}">
                            <a class="page-link prev-next" prev-next="plus" href="#">>></a>
                        </li>
                    {{ /previousNext }}
                </ul>
            </nav>
        </div>

    </div>
  `;

  //  Pagination variables
  let currentPage = 0;
  let ITEMS_PER_PAGE = 5;
  const TOTAL_PAGES = Math.ceil(authors.length / ITEMS_PER_PAGE);

  //  Render authors page template
  const updateHTML = () => {
    document.getElementById("root").innerHTML = Mustache.render(authorsTpl, {
      authors: authors.slice(
        currentPage * ITEMS_PER_PAGE,
        ITEMS_PER_PAGE * (currentPage + 1)
      ),
      pages: getPages(TOTAL_PAGES, currentPage),
      previousNext: paginationNvg(TOTAL_PAGES, currentPage),
    });
  };
  updateHTML();

  //  Adding event listeners to the authoresTpl
  const authorsMain = document.getElementById("root");
  authorsMain.addEventListener("click", (event) => {
    if (event.target.matches("a.prev-next")) {
      if (event.target.getAttribute("prev-next") === "minus") {
        currentPage--;
        updateHTML();
      } else {
        currentPage++;
        updateHTML();
      }
    } else if (event.target.matches("a.page-number")) {
      currentPage = event.target.getAttribute("data-page") * 1;
      updateHTML();
    } else if (event.target.matches(".dropdown-item")) {
      event.preventDefault();

      if (event.target.matches(".a-z")) {
        currentPage = 0;
        sortBy(authors, "name", "a-z");
      } else if (event.target.matches(".z-a")) {
        currentPage = 0;
        sortBy(authors, "name", "z-a");
      } else if (event.target.matches(".comm-m")) {
        currentPage = 0;
        sortBy(authors, "articlesCount", "asc");
      } else if (event.target.matches(".comm-l")) {
        currentPage = 0;
        sortBy(authors, "articlesCount", "desc");
      }
      updateHTML();
    }
  });
};

authorsTempalte();
