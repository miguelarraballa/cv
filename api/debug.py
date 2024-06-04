import datetime

class log:

    def __init__(self):
        self.file_name = 'api/debug.log'
        self.debug = True

    def write(self,text,type = ''):
        if not self.debug: 
            return False
        
        with open(self.file_name,"a") as file:
            date = datetime.datetime.now()
            if (type != ''):
                type = "["+type.upper()+"]"
            line = f"[{date}] "
            line += f" {type} {text} \r\n" 
            file.write(line)
            


    