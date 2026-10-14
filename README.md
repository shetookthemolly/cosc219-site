# Club of Munchkins
This site is a fake/made-up club revolved around the Munchkin Cat breed, the site consists of a home page, a web page explaining the site and what it's about, and a web page listing 3 articles of interest with a table.

## GitHub Live URL
[Club of Munchkins](https://shetookthemolly.github.io/cosc219-site)

### What I Found Difficult
In the first lab, I found only just brainstorming an idea for a site to be the most difficult part. I found myself changing the site's theme a lot. I also found using elements properly like emphasize and strong or elements that group content to be difficult to understand at first, but I believe I began to understand those concepts better now.

#### AI-Use
In the first lab, I primarily used chat bots to brainstorm an idea for the table in *projects.html*, as I struggled to come up with a idea for that. Aside from that, it was mainly just to help understand some elements that i was confused about. 

In the second lab, I used chat bots to help better understand certain styles and selectors and to understand how to use them better, I also used chat bots to understand a specific error I was getting in contact.html, which was using field sets inside a paragraph element.

In the third lab, I used chat bots to help understand flexbox and grid better, and used that understanding to pick which to use for certain implementations in the assignment. I also used chat bots to understand an error with the table and what I was misunderstanding with my implementation, however I ended up finding the cause of the error myself, which was the font size of the table causing it to clip outside it's container.

##### 09/29/26 Update (Lab 2)
In the second lab, I created a page with a form for providing contact information. I applied a lot of styling to all pages, and changed a few images. One styling decision I made was navigation links being highlighted when you hover your cursor over them. The reason I did this was to make the navigation footer on each page standout more. I quite enjoyed how the styling turned out on each page, but I still have more ideas for the next lab that will make each web page look even better.

###### 10/13/26 Update (Lab 3)
In the third lab, I finished off the styling of my web pages by using flexbox and grid. I used flexbox to implement a navigation bar, and grid to implement my article cards. 

I used flexbox for the navigation bar because I only wanted my links to display nicely in one direction, there was no need to have full control over the entire layout of the page. I used grid on the cards in order to display them nicely through columns and rows, and had them display dynamically based on the viewport width.

I additional made a two column section in both index.html and about.html. I used grid to implement this. The reason I chose grid in particular was because I wanted to have full control over the layout of these web pages, as I would be focusing on the content placement of the page's main content, and side bar content such as facts about Munchkin Cats. 

My breakpoint values are `@media (min-width: 38rem)`, `@media (min-width: 58rem)`, and `@media (min-width: 69rem)`. 

When viewing projects.html, If the width of the viewport were to be atleast `38rem`, then there will be a additional column for one of the article cards to display in. If the width of the viewport were to be atleast `58rem`, then another additional column for the article cards would display, providing one row of 4 columns of cards and a second row of just 1 column with a card. Any width less than `38rem` would display as one column with multiple rows containing the cards, which displays on mobile devices nicely. This design allows the cards to display dynamically in columns based off the width of the viewport.

When viewing about.html or index.html, If the width of the viewport were to be atleast `69rem`, then the sidebar content would display in a second column beside the first column, which contained the main content of the page. Any width less than `69rem` would display only one column with two rows, one row containing the main content and another containing the sidebar content. This avoids the problem of having the web page display wider than the viewport of a mobile device entirely. No side-scrolling bar would be visible.

![Munchkin cat performing a trick](./images/readmeimg.gif)