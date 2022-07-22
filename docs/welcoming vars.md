# Warning this is outdated and is moving to the wiki

First a warning because I am so terrible at explaining things (free credits if you submit a pull request of this remade)

In Hue v4.0 welcoming text has much more variables than before.


`{{user}}` -> returns the username of the user who joined<br/>
`{{server}}` -> returns the server name<br/>
`{{owner}}` -> returns the owner name<br/>
`{{rules}}` -> returns the rules channel in a clickable form<br/>

`{{user_avatar}}` -> returns the avatar url of the user who joined<br/>
`{{server_img}}` -> returns the server logo url<br/>


Okay so 2 more variables but still thats an improvement.

Additionally you can also create an embed welcome message by using the `[embed]` control variable 

then you can add flags such as 

Author text and images<br/>
`--author John Doe`<br/>
`--authorImg https://picsum.photos/200`<br/>
`--authorURL https://example.com`<br/>

Timestamps with the `[now]` control or with unix time e.g 1658019245<br/>
`--timestamp [now]` <br/>
`--timestamp 1658019245`<br/>

Footers<br/>
`--footer Welcome to {{server}}`<br/>
`--footerImg https://picsum.photos/200`<br/>

Titles and descriptions<br/>
`--title WELCOME TO VERY COOL SERVER `<br/>
`--description I hear {{owner}} is very cool`<br/>

Images and Thumbnails<br/>
`--image https://picsum.photos/200`<br/>
`--thumbnail https://picsum.photos/200`<br/>

Color in hex<br/>
`--color #fcba03`<br/>

And finally fields <br/>
`--add_field field title [|] field value [|] boolean`<br/>

to explain that a bit more (since I am horrible at explaining stuff)<br/>
`[|]` is a seperator control and there are three different any length arguments for that field.<br/>
`field title` is the title of the field.<br/>
`field value` would be the value of the field<br/>
`boolean` is an option boolean (has to be `true` or `false`) for if it should be inline or not.<br/>
and with `--add_field` you can add run that flag as many times as you'd like and it will add additional fields.<br/>

If you do not want to bother with all of this fancy stuff you can just use the premade embed by using the flag<br/>
`--premade`<br/>

So an example using the premade embed would look like.<br/>
`[embed] --premade`<br/>

and a custom one would like something like<br/>
`[embed] --timestamp [now] --author {{server}} --title Welcome {{username}} to {{server}} --description We welcome you here {{user}}!! --thumbnail {{user_avatar}} --color GREEN`<br/>

And a warning if your embed is invalid and creates and error instead of getting your welcome message, your welcoming channel will receive errors.<br/>