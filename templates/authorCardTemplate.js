const authorCardTpl = 
`
<main>
    {{#authors}}
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
    {{/authors}}
</main>
`