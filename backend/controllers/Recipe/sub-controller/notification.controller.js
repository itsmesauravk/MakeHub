const Notification = require('../../../models/notification.model')




const getNotifications = async (req, res) => {
    try {
        const userId = req.params.userId;
        if(!userId){
            return res.status(400).json({success:false, message:"Internal Server Error"})
        }
      const notifications = await Notification.find({ receiver: userId })
        .populate('sender', 'username')
        .populate('recipe', 'title slug')
        .sort({ createdAt: -1 });
  
      res.status(200).json({
        success: true,
        message: 'Notifications fetched successfully',
        data: notifications,
      });
    } catch (error) {
      console.error('Error fetching notifications:', error);
      res.status(500).json({success:false, message: 'Internal Server Error' });
    }
  };


  const markAsRead = async (req, res) => {
    try {
        const userId = req.params.userId //reciver
      await Notification.updateMany(
        { receiver: userId, read: false },
        { $set: { read: true } }
      );
  
      res.status(200).json({success:true, message: 'Notifications marked as read' });
    } catch (error) {
      console.error('Error marking notifications as read:', error);
      res.status(500).json({success:false, message: 'Internal Server Error' });
    }
  };




module.exports = {
    getNotifications,
    markAsRead
}
  
  