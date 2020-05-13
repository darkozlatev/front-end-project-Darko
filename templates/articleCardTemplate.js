const articleCardTpl = 
`
{{ #authorArticles }}
<div class="container">
    <div class="card border border-dark mt-4 col-12">
        <div class="card-body">
            <a href="../article/?id={{ id }}#comments-anchor"><h6 class="float-right text-warning">{{ commentsLength }} comments</h6 class="float-right"></a>
            <a class="text-warning text-decoration-none" href="../article/?id={{ id }}"><h5>{{ title }}</h5></a>
            <p class="mb-3">{{ date }}</p>
            <p class="card-text mb-1">{{ summary }}</p>

            {{ #tags }}
                <a class="text-warning text-decoration-none pr-2" href="../tag/?tag={{ . }}"><b>{{ . }}</b></a>
            {{ /tags }}

            <div>
                <div class='float-left pr-3'>
                    <a href="../author/?id={{ authorId }}"><img class="rounded-circle border border-warning img-border mt-3" style="width: 64px; height: 64px" src="{{ author.avatar }}"></a>
                </div>
                <div class="float-left ">
                    <h6 class="card-subtitle mt-4 text-muted">Author:</h6>
                    <a class="text-warning text-decoration-none h-25 d-inline-block" href="../author/?id={{ authorId }}"><h4>{{ author.name }}</h4></a> 
                </div>
                <a href="../article/?id={{ id }}" class="float-right btn btn-warning mt-5">Read article</a>
            </div>
        </div>
    </div>
</div>
{{ /authorArticles }}
`   

const articleCardFn = () => {
    return articleCardTpl
}

