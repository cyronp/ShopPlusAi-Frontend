"use client";

import { Search } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./ui/input-group";

export default function SearchInput() {
  return(
  <>
    <InputGroup className="h-auto w-sm rounded-full">
    <InputGroupInput placeholder="Pesquisar..."/>
      <InputGroupAddon>
      <Search/>
      </InputGroupAddon>
    </InputGroup>
  </>
  );
}
