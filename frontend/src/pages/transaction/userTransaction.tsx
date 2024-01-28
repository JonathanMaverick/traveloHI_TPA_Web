import ProfileSidebar from "../profile/profile-sidebar";
import "../../styles/pages/transaction/user_transaction.scss"

export default function UserTransaction(){
    return(
        <div className="user-transaction">
            <ProfileSidebar />
            <div className="user-transaction-content">
                <h2>Transaction</h2>
                <div className="filter">
                    
                </div>
            </div>
        </div>
    )
}