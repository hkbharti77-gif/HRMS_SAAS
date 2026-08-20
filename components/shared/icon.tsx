'use client';

import * as React from 'react';
import {
  LayoutDashboard, Building2, CreditCard, Tags, Flag, LifeBuoy, BarChart3,
  ScrollText, Megaphone, Settings, Network, GitFork, Boxes, BadgeCheck, MapPin,
  CalendarDays, FileText, ShieldCheck, Users, Contact, UserPlus, Upload, LogOut,
  FolderArchive, Activity, Hourglass, ArrowLeftRight, CalendarCheck, ListChecks,
  Clock, RefreshCw, CalendarOff, BookOpen, CheckSquare, Scale, Timer, ClockAlert,
  Banknote, PlayCircle, Layers, UserCog, ReceiptText, Receipt, HandCoins, Landmark,
  FileSpreadsheet, TrendingUp, Target, Repeat, LayoutGrid, MessageSquareHeart,
  MessagesSquare, Briefcase, FilePlus, KanbanSquare, CalendarClock, FileSignature,
  Share2, Ticket, Settings2, BookMarked, Laptop, PackagePlus, Wallet, GraduationCap,
  Award, PartyPopper, Vote, Wrench, Library, PieChart, Bell, Puzzle, Download,
  Brackets, Workflow, UserRound, Plus, HelpCircle, Search, ChevronDown, ChevronRight,
  ChevronLeft, Menu, X, Sun, Moon, LogIn, MoreHorizontal, MoreVertical, Filter,
  ArrowUpRight, ArrowDownRight, ArrowRight, CircleAlert, CircleCheck, CircleDot,
  Info, Trash2, Edit3, Eye, DownloadCloud, Send, Check, Clock3, AlertTriangle,
  Star, Sparkles, Bot, MessageSquare, FileSearch, Gauge, Brain, ThumbsUp,
  ChevronUp, Mail, ArrowLeft, Building, CheckCircle2, Rocket, Ban, Save,
  Pause, Box, List, GitBranch, Percent, UserX, CircleX,
  FileEdit, Minus, Coins, Video,
  type LucideIcon,
} from 'lucide-react';

const map: Record<string, LucideIcon> = {
  LayoutDashboard, Building2, CreditCard, Tags, Flag, LifeBuoy, BarChart3,
  ScrollText, Megaphone, Settings, Network, GitFork, Boxes, BadgeCheck, MapPin,
  CalendarDays, FileText, ShieldCheck, Users, Contact, UserPlus, Upload, LogOut,
  FolderArchive, Activity, Hourglass, ArrowLeftRight, CalendarCheck, ListChecks,
  Clock, RefreshCw, CalendarOff, BookOpen, CheckSquare, Scale, Timer, ClockAlert,
  Banknote, PlayCircle, Layers, UserCog, ReceiptText, Receipt, HandCoins, Landmark,
  FileSpreadsheet, TrendingUp, Target, Repeat, LayoutGrid, MessageSquareHeart,
  MessagesSquare, Briefcase, FilePlus, KanbanSquare, CalendarClock, FileSignature,
  Share2, Ticket, Settings2, BookMarked, Laptop, PackagePlus, Wallet, GraduationCap,
  Award, PartyPopper, Vote, Wrench, Library, PieChart, Bell, Puzzle, Download,
  Brackets, Workflow, UserRound, Plus, HelpCircle, Search, ChevronDown, ChevronRight,
  ChevronLeft, Menu, X, Sun, Moon, LogIn, MoreHorizontal, MoreVertical, Filter,
  ArrowUpRight, ArrowDownRight, ArrowRight, CircleAlert, CircleCheck, CircleDot,
  Info, Trash2, Edit3, Eye, DownloadCloud, Send, Check, Clock3, AlertTriangle,
  Star, Sparkles, Bot, MessageSquare, FileSearch, Gauge, Brain, ThumbsUp,
  ChevronUp, Mail, ArrowLeft, Building, CheckCircle2, Rocket, Ban, Save,
  Pause, Box, List, GitBranch, Percent, UserX, CircleX,
  FileEdit, Minus, Coins, Video,
};

export function Icon({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp = map[name] ?? CircleDot;
  return <Cmp className={className} />;
}
