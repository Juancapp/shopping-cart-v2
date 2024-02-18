import {
  BuildingStorefrontIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Select from "../Select";
import Searchbar from "../Searchbar";
import Radio from "../Radio";
import { OrderBy } from "../../../types";
import { categoryOptions } from "./constants";

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
      <div>
        <Select
          label="Category"
          name="category"
          options={categoryOptions}
          onChange={(e: { target: { value: any } }) =>
            console.log(e.target.value)
          }
        />
        {/* <Select /> */}
        <Radio values={[OrderBy.PRICE, OrderBy.RATE]} name="orderBy" />
      </div>
    </div>
  );
}

export default Navbar;
