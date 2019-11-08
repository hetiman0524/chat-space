json.content @message.content
json.name @message.user.name
json.created_at @message.created_at.strftime("%Y/%m/%d(%a) %H:%M:%S")
json.image @message.image
json.id @message.id