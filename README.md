# A P2P file-sharing application over IPFS via Fluence

<a href="https://relay01.fluence.dev">Link to the app</a>

<img align="right" width="33%" src="p2p-fileshare.png"/>

## What

Example of a p2p application that shares files between browsers using the Fluence network as a distributed backend and IPFS as storage. Fluence is used by clients to announce and discover functions, and functions are, in turn, used to discover a file and mediate its storage. Upload and download interactions then happen directly between clients and IPFS.

## How?
One client can advertize a file on the Fluence network so that another client can download it. To advertise a file with hash `QmFile,` the client announces to the network that a function `IPFS_QmFile` is now available. To download the file, another client calls that function and receives the address of an IPFS node as a result. It can then download the file from that IPFS node.

And that's what's conceptually happening. Under the hood, there's a DHT network, function routing (i.e., how to find the first client), and so on. What's interesting about that is there's nothing hard-coded. Everything is just a function call.

Clearly, the first client (let's call it "provider client") wants to share the file with someone. It's a lazy client, and its plan is simple: *if someone asks me a file, I'll upload it to some storage, and give back an address of that storage*. Since IPFS is awesome, we'll use it for file sharing and storage. Note that provider client doesn't transmit file directly, it barely uploads it to some IPFS node, and returns an address of that node. Laazy. 

So, here are the steps:

0. Announced function `IPFS_QmFile` to the network (it's not discoverable through DHT)
*Then, someone called that function, asking for a file*
1. Gosh, need to find where to upload the file: call `IPFS_multiaddr` function
2. Received `/dns4/ipfs2.fluence.one/https/443` as a result
3. Need to upload that file: well, uploads it
4. Send back IPFS node address: `/dns4/ipfs2.fluence.one/https/443`

And that's it: no complex connections, traffic management, and whatnot. IPFS handles all of that, functions merely mediate the process. Consumer client (the one who asked the file in the first place) is free to do what it wants with that node address, maybe forward it to a more complex workflow?

## The code
There are a JS and the Elm parts of code. JS is where all business logic, function calls, and gear-turning happens, and Elm is where all the UI stuff is defined. 

If diving into the code, it's better to start with [ports.js](admin/src/ports.js). That's the boundary between business logic and UI, and should be pretty self-explanatory. Or it will be one day ????.

## Running it
```
cd p2p-filesharing
npm i
npm run start
```


## Elm
Did I say that the Elm is awesome? No?! Well, let me fix that: *it is awesome.* And being awesome, Elm gives you this little blue icon in the right bottom corner, and it's a... *Time Machine*. For real. You can use it to go back and forth in the application lifecycle and see what was happening, why, see all the UI changes that usually occur in a blink of an eye. Have fun!