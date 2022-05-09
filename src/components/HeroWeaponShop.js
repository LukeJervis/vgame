import { observer } from "mobx-react";
import heroWeapons from "../heroEquipment/heroWeapons.json";
import heroArmour from "../heroEquipment/heroArmour.json";
import { useRootStore } from "../provider/RootStoreProvider";
import { heroMoneyConverter } from "./helpers";
import "./heroWeaponShop.css";

const HeroWeaponShop = () => {
  const {
    heroInventoryStore: { handleBuy },
  } = useRootStore();

  const heroPurchase = (purchase) => {
    handleBuy(purchase);
  };

  const listHeroWeapons = heroWeapons.map((heroWeapons) => (
    <div key={heroWeapons.id + Math.random().toString(36)} className="heroWeaponShop__weapon">
      <div key={heroWeapons.id + Math.random().toString(36)} className="heroWeaponShop__name">
        {heroWeapons.name}
      </div>
      <div key={heroWeapons.id + Math.random().toString(36)} className="heroWeaponShop__cost">
        Cost: {heroMoneyConverter(heroWeapons.cost)}
      </div>
      <div key={heroWeapons.id + Math.random().toString(36)} className="heroWeaponShop__damage">
        Damage Multi: {heroWeapons.damage}
      </div>
      <button
        className="heroWeaponShop__buyButton"
        onClick={() => heroPurchase(heroWeapons)}
        key={heroWeapons.id + Math.random().toString(36)}
      >
        Buy
      </button>
    </div>
  ));

  const listHeroArmour = heroArmour.map((heroArmour) => (
    <div key={heroArmour.id + Math.random().toString(36)} className="heroWeaponShop__weapon">
      <div key={heroArmour.id + Math.random().toString(36)} className="heroWeaponShop__name">
        {heroArmour.name}
      </div>
      <div key={heroArmour.id + Math.random().toString(36)} className="heroWeaponShop__cost">
        Cost: {heroMoneyConverter(heroArmour.cost)}
      </div>
      <div key={heroArmour.id + Math.random().toString(36)} className="heroWeaponShop__damage">
        Armour: {heroArmour.constitution}
      </div>
      <button
        className="heroWeaponShop__buyButton"
        onClick={() => heroPurchase(heroArmour)}
        key={heroArmour.id + Math.random().toString(36)}
      >
        Buy
      </button>
    </div>
  ));

  return (
    <div className="heroWeaponShop__container">
      <div className="heroWeaponShop__title">Weapons</div>
      <div className="heroWeaponShop__list">{listHeroWeapons}</div>
      <div className="heroWeaponShop__title">Armour</div>
      <div className="heroWeaponShop__list">{listHeroArmour}</div>
    </div>
  );
};

export default observer(HeroWeaponShop);
