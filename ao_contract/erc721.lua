

Nfts = {}

count = 0

Handlers.add('MintNft', Handlers.utils.hasMatchingTag('Action', 'MintNft'), function (msg)
	table.insert(Nfts, {id = count, url = msg.Data})
    count = count + 1
	Handlers.utils.reply("NFT Minted")(msg)
    
end)

Handlers.add('ListNfts', Handlers.utils.hasMatchingTag('Action', 'ListNfts'), function (msg)
	-- Handlers.utils.reply(table.getn(Nfts))(msg)
    ao.send({Target = msg.From, Data = Nfts})
    
end)