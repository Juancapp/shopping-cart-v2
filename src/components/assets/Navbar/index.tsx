import {
  BuildingStorefrontIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Select from "../Select";
import Searchbar from "../Searchbar";
import { categoryOptions, orderOptions } from "./constants";
import Radio from "../Radio";
import { OrderBy } from "../../../types";

function Navbar() {
  return (
    <div className="bg-blue-950 p-4 flex flex-col gap-2">
      <div className="flex justify-between">
        <div className="flex">
          <BuildingStorefrontIcon className="text-white w-8" />
          <p className="text-white">Cocoa</p>
        </div>
        <ShoppingCartIcon className="text-white w-8" />
      </div>
      <Searchbar />
      <div className="flex flex-col justify-center gap-2 md:gap-0 items-center md:flex-row">
        <Select label="Category" name="category" options={categoryOptions} />
        <Select label="Order" name="order" options={orderOptions} />
        <Radio values={[OrderBy.PRICE, OrderBy.RATE]} name="orderBy" />
      </div>
    </div>
  );
}

export default Navbar;
