Help Document for Formatting Names.


Example Usernames

John (Discord Username)
JohnDoe69 (Roblox Username)
John Doe (Roblox Display Name)
JohnishDoe (Steam Name)
JohnBenderDoe (Minecraft Name)

{{platform_name}} = whatever "verification_current" is set to aka whatever verification method is selected it will just return that platform username
{{discord}} = "John" Returns discord username
{{roblox_username}} "JohnDoe69" returns roblox username
{{roblox_display}} "John Doe" returns roblox display name
{{steam}} "JohnishDoe" returns steam name
{{minecraft}} "JohnBenderDoe" returns minecraft username

e.g 
"{{discord}} ({{minecraft}})" => John (JohnBenderDoe)

If you put "" as the value the discord api will detect that as removing their nickname.
Additionally if their username is over the discord username limit it will just cut off abruptly 