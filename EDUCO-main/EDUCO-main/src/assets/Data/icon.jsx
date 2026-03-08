import { CircleChevronRight } from 'lucide-react';
import { MoveLeft } from 'lucide-react';
import { User } from 'lucide-react';
import { Mail } from 'lucide-react';
import { Lock } from 'lucide-react';
import { Menu } from 'lucide-react';
import { GraduationCap } from 'lucide-react';
import { ListTodo } from 'lucide-react';
import { Gamepad2 } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { TreePine } from 'lucide-react';
import { Plus } from 'lucide-react';
import { Check } from 'lucide-react';
import { Search } from 'lucide-react';
import { Play } from 'lucide-react';
import { Facebook } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { FaXTwitter } from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa";
import { Youtube } from 'lucide-react';
import { AiOutlineControl } from "react-icons/ai";
import { ClipboardList } from 'lucide-react';
import { List } from 'lucide-react';
import { TbTargetArrow } from "react-icons/tb";
import { EllipsisVertical } from 'lucide-react';
import { Upload } from 'lucide-react';
import { Link } from 'lucide-react';





// Kalau ingin menggunakan icon, 
// cukup panggil dataIcon dengan parameter size dan color, 
// lalu pilih icon yang diinginkan

// contoh nya seperti ini:
// {dataIcon({size: 50,color:"black" }).chervronRight} 


const dataIcon = ( children ) => {
    return {
        "chervronRight": <CircleChevronRight size={children.size} color={children.color} />,
        "arrowLeft": <MoveLeft size={children.size} color={children.color} />,
        "user": <User size={children.size} color={children.color} />,
        "mail": <Mail size={children.size} color={children.color} />,
        "lock": <Lock size={children.size} color={children.color} />,
        "menu": <Menu size={children.size} color={children.color} />,
        "graduationCap": <GraduationCap size={children.size} color={children.color} />,
        "listTodo": <ListTodo size={children.size} color={children.color} />,
        "gamepad": <Gamepad2 size={children.size} color={children.color} />,
        "logout": <LogOut size={children.size} color={children.color} />,
        "treePine": <TreePine size={children.size} color={children.color} />,
        "plus": <Plus size={children.size} color={children.color} />,
        "check": <Check size={children.size} color={children.color} />,
        "search": <Search size={children.size} color={children.color} />,
        "play": <Play size={children.size} color={children.color} />,
        "facebook": <Facebook size={children.size} color={children.color} />,
        "instagram": <Instagram size={children.size} color={children.color} />,
        "twitter": <FaXTwitter size={children.size} color={children.color} />,
        "tiktok": <FaTiktok size={children.size} color={children.color} />,
        "youtube": <Youtube size={children.size} color={children.color} />,
        "control": <AiOutlineControl size={children.size} color={children.color} />,
        "clipboard": <ClipboardList size={children.size} color={children.color} />,
        "list": <List size={children.size} color={children.color} />,
        "target": <TbTargetArrow size={children.size} color={children.color} />,
        "more": <EllipsisVertical size={children.size} color={children.color} />,
        "upload": <Upload size={children.size} color={children.color} />,
        "link": <Link size={children.size} color={children.color} />,
    
    }
};


export default dataIcon;

