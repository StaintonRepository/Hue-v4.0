First a warning because I am so terrible at explaining things (free credits if you submit a pull request of this remade)

In Hue v4.0 welcoming text has much more variables than before.


{{user}} -> returns the username of the user who joined
{{server}} -> returns the server name
{{owner}} -> returns the owner name
{{rules}} -> returns the rules channel in a clickable form

Okay so 2 more variables but still thats an improvement.

Additionally you can also create an embed welcome message by using the `[embed]` control variable 

then you can add flags such as 

Author text and images
`--author John Doe`
`--authorImg https://picsum.photos/200`
`--authorURL https://example.com`

Timestamps with the `[now]` control or with unix time e.g 1658019245
`--timestamp [now]` 
`--timestamp 1658019245`

Footers
`--footer Welcome to {{server}}`
`--footerImg https://picsum.photos/200`

Titles and descriptions
`--title WELCOME TO VERY COOL SERVER `
`--description I hear {{owner}} is very cool`

Images and Thumbnails
`--image https://picsum.photos/200`
`--thumbnail https://picsum.photos/200`

Color in hex
`--color #fcba03`

And finally fields 
`--add_field field title [|] field value [|] boolean`

to explain that a bit more (since I am horrible at explaining stuff)
`[|]` is a seperator control and there are three different any length arguments for that field.
`field title` is the title of the field.
`field value` would be the value of the field
`boolean` is an option boolean (has to be `true` or `false`) for if it should be inline or not.
and with `--add_field` you can add run that flag as many times as you'd like and it will add additional fields.

If you do not want to bother with all of this fancy stuff you can just use the premade embed by using the flag
`--premade`

So an example using the premade embed would look like.
`[embed] --premade`

and a custom one would like something like
`[embed] --timestamp [now] --author {{server}} --title Welcome {{user}} to {{Server}} --description We welcome you here {{user}}!!`

And a warning if your embed is invalid and creates and error instead of getting your welcome message, your welcoming channel will receive errors.