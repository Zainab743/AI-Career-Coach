import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { GraduationCap, Home, LayoutDashboard } from "lucide-react";
import { StarsIcon } from "lucide-react";
import { ChevronDown } from "lucide-react";
import { FileText } from "lucide-react";
import { PenBox } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "./ui/dropdown-menu";


const Header=()=>{
    return(
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href='/'>
                <Image 
                    src="/logo2.png"
                    alt="aspAIre logo"
                    width={200}
                    height={60}
                    className="h-30 py-1 w-auto object-contain"
                />
            </Link>
            <div className="flex items-center gap-4">
                <SignedIn>
                    <Link href={"/"}>
                        <Button variant="outline" className="flex items-center gap-2">
                            <Home className="h-4 w-4" />
                                <span className="hidden md:block">Home</span>
                        </Button>
                    </Link>
                    <Link href={"/about"}>
                        <Button variant="outline" className="flex items-center gap-2">
                            <LayoutDashboard className="h-4 w-4" />
                                <span className="hidden md:block">About</span>
                        </Button>
                    </Link>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="flex items-center gap 2">
                            <StarsIcon className="h-4 w-4" />
                                <span className=" hidden md:block">Growth Tools</span>
                                <ChevronDown className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Link href={"/resume"} className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                <span>Build Resume</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href={"/interview"} className="flex items-center gap-2">
                                <PenBox className="h-4 w-4" />
                                <span>Interview Prep</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            
                </SignedIn>

                <SignedOut>
                    <SignInButton>
                        <Button variant="outline">Sign In</Button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton
                        appearance={{
                            elements:{
                                avatarBox: "w-10 h-10",
                                userButtonPopoverCard: "shadow -xl",
                                userPreviewMainIdentifier: "font-semibold",
                            }
                        }}
                        afterSignOutUrl="/"
                    />


                </SignedIn>
            </div>
        </nav>
    </header>
    );
};
export default Header;

