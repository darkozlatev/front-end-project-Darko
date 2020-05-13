const paginationBarTpl = 
`
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
`

const paginationBarFn = () => {
    return paginationBarTpl
}