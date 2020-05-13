const commentsCardTpl = 
`
<div id="comments-anchor" class="container">
    {{ #comments }}
        <div class="media comment-card">
            {{ #authorComments }}
                <div class="float-left pr-4">
                    <a class="text-warning text-decoration-none" href="../author/?id={{ userId }}">
                        <img class="rounded-circle border border-warning img-border img-size" src="{{ avatar }}">
                    </a>
                </div>
            {{ /authorComments }}   
            {{ ^authorComments }}
                <div class="float-left pr-4">
                    <a class="text-warning text-decoration-none" href="../author/?id={{ userId }}">
                        <img class="rounded-circle border border-warning img-border img-size" src="https://iptc.org/wp-content/uploads/2018/05/avatar-anonymous-300x300.png">
                    </a>
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
`